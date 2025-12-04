import { observer } from "mobx-react-lite";
import { chatStore } from "./model/chatStore";
import ChatHeader from "./ui/ChatHeader";
import ChatHistory from "./ui/ChatHistory";
import ChatInput from "./ui/ChatInput";
import "./helper.scss";

export const Helper: React.FC = observer(() => {
    const {
        messages,
        isSending,
        inputValue,
        setInputValue,
        sendMessage,
        isConnected,
        connectionError,
        reconnect,
    } = chatStore;

    return (
        <section className="helper-chat mb-10">
            <div className="helper-chat__container">
                <div className="helper-chat__panel">
                    <ChatHeader
                        isConnected={isConnected}
                        connectionError={connectionError}
                        onReconnect={reconnect}
                    />
                    <ChatHistory messages={messages} isSending={isSending} />
                    <ChatInput
                        value={inputValue}
                        onChange={setInputValue}
                        onSubmit={sendMessage}
                        isSending={isSending}
                    />
                </div>
            </div>
        </section>
    );
});
