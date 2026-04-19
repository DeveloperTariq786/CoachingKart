export interface Message {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    isOwn?: boolean;
}

export interface ChatProps {
    lectureId?: string;
    sessionId?: string | null;
}

export interface ChatMessage {
    role: "user" | "model";
    text: string;
}

export interface ApiEvent {
    content?: {
        parts?: Array<{
            text?: string;
            functionCall?: unknown;
            functionResponse?: unknown;
        }>;
        role?: string;
    };
}
