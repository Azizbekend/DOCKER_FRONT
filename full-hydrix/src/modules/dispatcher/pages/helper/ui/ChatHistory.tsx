import { memo, useMemo, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import type { ChatMessage as ChatMessageType } from "../model/chatStore";

interface ChatHistoryProps {
    messages: ChatMessageType[];
    isSending: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = memo(({ messages, isSending }) => {
    const preparedMessages = useMemo(
        () =>
            messages.map(message => ({
                ...message,
                readableTime: new Date(message.createdAt).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            })),
        [messages]
    );

    const scrollToBottomRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (node) {
                node.scrollIntoView({ behavior: "smooth", block: "end" });
            }
        },
        [messages.length]
    );

    return (
        <div className="chat-history">
            {preparedMessages.map(message => (
                <ChatMessage key={message.id} message={message} />
            ))}

            {isSending && (
                <div className="chat-history__status">ИИльяс формирует ответ…</div>
            )}

            <div ref={scrollToBottomRef} aria-hidden="true" />
        </div>
    );
});

export default ChatHistory;
