import { cn } from "@/lib/utils";

interface Props {
  value: number;
  className?: string;
  showLabel?: boolean;
  color?: "indigo" | "green" | "yellow";
}

export function ProgressBar({ value, className, showLabel = false, color = "indigo" }: Props) {
  const pct = Math.min(100, Math.max(0, value));

  const gradientMap = {
    indigo: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    green:  "linear-gradient(90deg, #10b981, #34d399)",
    yellow: "linear-gradient(90deg, #f59e0b, #fbbf24)",
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-1.5 rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: gradientMap[color],
            boxShadow: pct > 0 ? `0 0 6px rgba(99,102,241,0.4)` : 'none',
          }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-slate-600 mt-1 text-right">{pct.toFixed(0)}%</p>
      )}
    </div>
  );
}
