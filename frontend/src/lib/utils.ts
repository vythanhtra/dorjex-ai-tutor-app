import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LEVEL_COLORS: Record<string, string> = {
  L1: "text-indigo-300",
  L2: "text-violet-300",
  L3: "text-pink-300",
  L4: "text-amber-300",
};

export const LEVEL_BG: Record<string, string> = {
  L1: "rgba(99,102,241,0.12)",
  L2: "rgba(139,92,246,0.12)",
  L3: "rgba(236,72,153,0.12)",
  L4: "rgba(245,158,11,0.12)",
};

export const LEVEL_BORDER: Record<string, string> = {
  L1: "rgba(99,102,241,0.25)",
  L2: "rgba(139,92,246,0.25)",
  L3: "rgba(236,72,153,0.25)",
  L4: "rgba(245,158,11,0.25)",
};

export const LEVEL_LABELS: Record<string, string> = {
  L1: "Beginner",
  L2: "Intermediate",
  L3: "Advanced",
  L4: "Expert",
};
