import { ApiEvent } from '../types/chat.types';

const SESSION_BASE_URL = process.env.NEXT_PUBLIC_VEO_CHAT_SESSION_URL || 'http://localhost:8002/apps/veo_chat_agent';
const RUN_API_URL = process.env.NEXT_PUBLIC_VEO_CHAT_RUN_URL || 'http://localhost:8002/run';
const APP_NAME = process.env.NEXT_PUBLIC_VEO_CHAT_APP_NAME || 'veo_chat_agent';


export const chatService = {
    /**
     * Creates a new chat session for a user.
     * @param email The user's email (used as identifier)
     * @param sessionId The generated session ID
     * @param lectureId The ID of the lecture related to the chat
     */
    createSession: async (email: string, sessionId: string, lectureId: string) => {
        try {
            const response = await fetch(`${SESSION_BASE_URL}/users/${email}/sessions/${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    video_analysis_result: "",
                    lecture_id: lectureId
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create chat session');
            }

            return await response.json();
        } catch (error) {
            console.error('Chat service error (session):', error);
            throw error;
        }
    },

    /**
     * Sends a message to the chat agent and returns the model response.
     */
    sendMessage: async (email: string, sessionId: string, text: string): Promise<string> => {
        try {
            const res = await fetch(RUN_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    app_name: APP_NAME,
                    user_id: email,
                    session_id: sessionId,
                    new_message: {
                        role: "user",
                        parts: [{ text }],
                    },
                    streaming: false,
                }),
            });

            if (!res.ok) throw new Error(`API error: ${res.status}`);

            const events: ApiEvent[] = await res.json();

            // Filter to only model text responses (no function calls/responses)
            const modelTexts = events
                .filter((e) => {
                    const role = e.content?.role;
                    const parts = e.content?.parts;
                    if (role !== "model" || !parts) return false;
                    return parts.some((p) => p.text && !p.functionCall);
                })
                .flatMap((e) =>
                    (e.content?.parts ?? [])
                        .filter((p) => p.text && !p.functionCall)
                        .map((p) => p.text!)
                );

            return modelTexts.join("\n\n") || "No response received.";
        } catch (error) {
            console.error('Chat service error (message):', error);
            throw error;
        }
    }
};


export default chatService;
