import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDuration = (seconds?: number) => {
    if (!seconds) return '00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const pad = (n: number) => n.toString().padStart(2, '0');

    if (h > 0) {
        return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }
    return `${pad(m)}:${pad(s)}`;
};

/**
 * Generates a unique session ID for chat sessions
 * Format: session_<random_alphanumeric_6>_lectureId_<lectureId>
 */
export const generateSessionId = (lectureId: string = 'unknown') => {
    const randomId = Math.random().toString(36).substring(2, 8);
    return `session_${randomId}_lectureId_${lectureId}`;
};

