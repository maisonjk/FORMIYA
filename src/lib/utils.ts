import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "Today";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Local Storage safe hydration
export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(`formed_${key}`);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn(`Error reading localStorage key formed_${key}:`, e);
  }
  return defaultValue;
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`formed_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error saving localStorage key formed_${key}:`, e);
  }
}
