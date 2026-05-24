import {
  format,
  parseISO,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";
import { nanoid } from "nanoid";

export {
  format,
  parseISO,
  isToday,
  isTomorrow,
  isYesterday,
  nanoid,
} from "date-fns";
export { nanoid as generateId } from "nanoid";

export function groupByDateLabel(dateStr: string): string {
  const date = parseISO(dateStr);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEEE, MMM d");
}

export function clampSortOrder(
  items: { sortOrder: number }[],
  targetIndex: number,
): number {
  if (items.length === 0) return 1000;
  if (targetIndex <= 0) return items[0]!.sortOrder - 1000;
  if (targetIndex >= items.length)
    return items[items.length - 1]!.sortOrder + 1000;
  const before = items[targetIndex - 1]!.sortOrder;
  const after = items[targetIndex]!.sortOrder;
  return (before + after) / 2;
}
