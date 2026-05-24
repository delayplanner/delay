import type { SyncQueueItem, EntityType, SyncAction } from "../../shared/types";

export interface SyncOperation {
  id: string;
  entityType: EntityType;
  entityId: string;
  action: SyncAction;
  payload: unknown;
  timestamp: string;
}

export interface SyncResult {
  success: boolean;
  conflict?: boolean;
  error?: string;
}

interface SyncAdapter {
  push(ops: SyncOperation[]): Promise<SyncResult[]>;
  pull(since: string): Promise<SyncOperation[]>;
}

export class SyncEngine {
  private queue: SyncQueueItem[] = [];
  private lastSyncAt: string = new Date(0).toISOString();
  private isSyncing = false;

  constructor(
    private adapter: SyncAdapter,
    private onConflict?: (op: SyncOperation) => Promise<SyncOperation>,
  ) {}

  enqueue(item: SyncQueueItem): void {
    this.queue.push(item);
  }

  async sync(): Promise<void> {
    if (this.isSyncing) return;
    this.isSyncing = true;

    try {
      const toPush = this.queue.map(
        (q): SyncOperation => ({
          id: q.id,
          entityType: q.entityType,
          entityId: q.entityId,
          action: q.action,
          payload: q.payload,
          timestamp: q.createdAt,
        }),
      );

      const pushResults = await this.adapter.push(toPush);
      const failedOps: SyncQueueItem[] = [];

      for (let i = 0; i < pushResults.length; i++) {
        const result = pushResults[i]!;
        const item = this.queue[i]!;

        if (result.success) continue;

        if (result.conflict && this.onConflict) {
          const resolved = await this.onConflict({
            id: item.id,
            entityType: item.entityType,
            entityId: item.entityId,
            action: item.action,
            payload: item.payload,
            timestamp: item.createdAt,
          });
          failedOps.push({
            ...item,
            payload: resolved.payload,
            retryCount: item.retryCount + 1,
          });
        } else {
          failedOps.push({ ...item, retryCount: item.retryCount + 1 });
        }
      }

      this.queue = failedOps;

      const remoteOps = await this.adapter.pull(this.lastSyncAt);
      this.lastSyncAt = new Date().toISOString();

      return;
    } finally {
      this.isSyncing = false;
    }
  }

  getQueueLength(): number {
    return this.queue.length;
  }
}
