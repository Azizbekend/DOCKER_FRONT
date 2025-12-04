import { Icon } from "@/shared/ui/icon";
import { memo, useCallback, useRef } from "react";

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isSending: boolean;
}

const ChatInput: React.FC<ChatInputProps> = memo(
    ({ value = "", onChange, onSubmit, isSending }) => {
        const textareaRef = useRef<HTMLTextAreaElement | null>(null);

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSubmit();
        };

        const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChange(event.target.value);
        };

        const isEmpty = value.trim().length === 0;

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (event.key === "Enter" && !event.shiftKey) {
                    if (isSending || isEmpty) {
                        return;
                    }
                    event.preventDefault();
                    onSubmit();
                }
            },
            [isSending, isEmpty, onSubmit]
        );

        return (
            <form className="chat-input" onSubmit={handleSubmit}>
                <div className="chat-input__footer">
                    <textarea
                        ref={textareaRef}
                        className="chat-input__field"
                        placeholder="Опишите проблему, укажите измерения и желаемый результат"
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        rows={3}
                        disabled={isSending}
                        style={{ height: "100px" }}
                    />
                    <button
                        type="submit"
                        className="chat-input__send"
                        disabled={isSending || isEmpty}
                        aria-label="Отправить сообщение"
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 4.875H9.25M9.25 4.875L4.875 0.5M9.25 4.875L4.875 9.25" stroke="#4A85F6" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <span className="chat-input__hint">
                    Нажмите Enter, чтобы отправить. Shift + Enter — новая строка.
                </span>
            </form>
        );
    }
);

export default ChatInput;
