import type { SyncOperation } from "./sync-engine";

export interface ConflictResolver {
  resolve(local: SyncOperation, remote: SyncOperation): SyncOperation;
}

export class LastWriteWinsResolver implements ConflictResolver {
  resolve(local: SyncOperation, remote: SyncOperation): SyncOperation {
    return local.timestamp >= remote.timestamp ? local : remote;
  }
}
