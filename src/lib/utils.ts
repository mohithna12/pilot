import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeRemaining(ms: number): string {
  if (ms <= 0) return "Time's up!";
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function getRiskLevel(
  completionPercent: number,
  timeElapsedPercent: number
): "LOW" | "MEDIUM" | "HIGH" {
  const ratio = completionPercent / Math.max(timeElapsedPercent, 1);
  if (ratio >= 0.8) return "LOW";
  if (ratio >= 0.5) return "MEDIUM";
  return "HIGH";
}
