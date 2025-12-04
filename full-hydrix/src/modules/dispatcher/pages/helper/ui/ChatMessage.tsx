import { memo } from "react";
import ReactMarkdown from "react-markdown";
import type { ChatMessage as ChatMessageType } from "../model/chatStore";

const ROLE_LABEL: Record<"user" | "ai", string> = {
    user: "Вы",
    ai: "ИИльяс",
};

interface Props {
    message: ChatMessageType & {
        readableTime?: string;
    };
}

const ChatMessage = memo(({ message }: Props) => {
    const role = message.role;
    const containerClass = `chat-message chat-message_${role}`;
    const isAiMessage = role === "ai";

    return (
        <article className={containerClass}>
            <div className="chat-message__meta">
                <span className="chat-message__author">{ROLE_LABEL[role]}</span>
                <span className="chat-message__time">{message.readableTime}</span>
            </div>
            <div className="chat-message__text">
                {isAiMessage ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                ) : (
                    <p>{message.text}</p>
                )}
            </div>
        </article>
    );
});

export default ChatMessage;
