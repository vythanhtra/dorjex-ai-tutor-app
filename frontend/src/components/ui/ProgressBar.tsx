import { cn } from "@/lib/utils";

interface Props {
  value: number;
  className?: string;
  showLabel?: boolean;
  color?: "indigo" | "green" | "yellow";
}

export function ProgressBar({ value, className, showLabel = false, color = "indigo" }: Props) {
  const colorMap = {
    indigo: "bg-indigo-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={cn("h-2 rounded-full transition-all duration-500", colorMap[color])}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-1 text-right">{value.toFixed(0)}%</p>
      )}
    </div>
  );
}
