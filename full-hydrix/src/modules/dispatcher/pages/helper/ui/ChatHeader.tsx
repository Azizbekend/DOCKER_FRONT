import { observer } from "mobx-react-lite";
import iilyas from "../static/icon_iilyas.png";

interface ChatHeaderProps {
    isConnected: boolean;
    connectionError: string | null;
    onReconnect: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = observer(
    ({ isConnected, connectionError, onReconnect }) => {
        return (
            <header className="chat-header">
                <div className="chat-header__descriptor">
                    <div className="chat-header__icon">
                        <img src={iilyas} alt="" />
                    </div>
                    <div>
                        <p className="chat-header__title">ИИльяс</p>
                        <p className="chat-header__subtitle">
                            Ведите диалог, чтобы получить рекомендации по технологическим ситуациям
                        </p>
                    </div>
                </div>

                <div className="chat-header__status">
                    {isConnected ? (
                        <div className="chat-header__status-item chat-header__status-item_connected">
                            <span className="chat-header__status-dot" />
                            <span>Подключено</span>
                        </div>
                    ) : (
                        <div className="chat-header__status-item chat-header__status-item_disconnected">
                            <span className="chat-header__status-dot" />
                            <span>Не подключено</span>
                            {connectionError && (
                                <button
                                    type="button"
                                    className="chat-header__reconnect"
                                    onClick={onReconnect}
                                    title="Переподключиться"
                                >
                                    Переподключиться
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </header>
        );
    }
);

export default ChatHeader;
