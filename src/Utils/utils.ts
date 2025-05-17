import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS utilities
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
} 