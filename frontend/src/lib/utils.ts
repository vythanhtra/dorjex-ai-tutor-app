import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LEVEL_COLORS: Record<string, string> = {
  L1: "bg-green-100 text-green-700",
  L2: "bg-blue-100 text-blue-700",
  L3: "bg-purple-100 text-purple-700",
  L4: "bg-red-100 text-red-700",
};

export const LEVEL_LABELS: Record<string, string> = {
  L1: "Beginner",
  L2: "Intermediate",
  L3: "Advanced",
  L4: "Expert",
};
