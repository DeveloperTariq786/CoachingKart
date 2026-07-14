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

export interface ChatSession {
    id: string;
    app_name: string;
    user_id: string;
    create_time: string;
    update_time: string;
    firstUserMessage: string | null;
}

export interface SessionResponse {
    sessions: ChatSession[];
    total: number;
    limit: number;
    offset: number;
    lecture_id: string;
}

export interface ChatEvent {
    id: string;
    content: {
        parts: Array<{ text: string }>;
        role: "user" | "model";
    };
    timestamp: number;
    author: string;
}

export interface SessionDetail {
    id: string;
    appName: string;
    userId: string;
    events: ChatEvent[];
    lastUpdateTime: number;
}
