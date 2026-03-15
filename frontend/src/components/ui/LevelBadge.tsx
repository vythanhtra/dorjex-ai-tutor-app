import { cn } from "@/lib/utils";
import { LEVEL_COLORS, LEVEL_LABELS, LEVEL_BG, LEVEL_BORDER } from "@/lib/utils";

export function LevelBadge({ level }: { level: string }) {
  return (
    <span
      className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", LEVEL_COLORS[level] ?? "text-slate-400")}
      style={{
        background: LEVEL_BG[level] ?? 'rgba(100,100,100,0.1)',
        border: `1px solid ${LEVEL_BORDER[level] ?? 'rgba(100,100,100,0.2)'}`,
      }}
    >
      {LEVEL_LABELS[level] ?? level}
    </span>
  );
}
