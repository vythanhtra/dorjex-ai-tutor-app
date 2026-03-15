import { cn, LEVEL_COLORS, LEVEL_LABELS } from "@/lib/utils";

export function LevelBadge({ level }: { level: string }) {
  return (
    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", LEVEL_COLORS[level] ?? "bg-gray-100 text-gray-600")}>
      {LEVEL_LABELS[level] ?? level}
    </span>
  );
}
