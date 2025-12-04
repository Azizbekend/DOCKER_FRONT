import { makeAutoObservable, runInAction } from "mobx";
import { lmStudioService } from "../service/lmStudioService";

export type MessageRole = "user" | "ai";

export interface ChatMessage {
    id: string;
    role: MessageRole;
    text: string;
    createdAt: string;
}

class ChatStore {
    messages: ChatMessage[] = [];
    inputValue = "";
    isSending = false;
    isConnected = false;
    connectionError: string | null = null;
    abortController: AbortController | null = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });

        this.messages = [
            this.createMessage(
                "ai",
                "Привет! Я цифровой помощник ИИльяс. Расскажите, с какой задачей столкнулись, и я предложу пошаговое решение."
            ),
        ];

        this.initializeConnection();
    }

    async initializeConnection(): Promise<void> {
        try {
            const result = await lmStudioService.initialize();

            runInAction(() => {
                this.isConnected = result.connected;
                this.connectionError = null;

                if (!this.isConnected) {
                    this.connectionError =
                        "Сервер недоступен. Убедитесь, что сервер запущен и модель загружена.";
                }
            });
        } catch (error: any) {
            runInAction(() => {
                this.isConnected = false;
                this.connectionError = error.message || "Ошибка подключения к серверу";
            });
        }
    }

    setInputValue(value = ""): void {
        this.inputValue = value.slice(0, 1200);
    }

    async sendMessage(): Promise<void> {
        const text = this.inputValue.trim();

        if (!text || this.isSending) return;

        const userMessage = this.createMessage("user", text);
        this.messages = [...this.messages, userMessage];
        this.inputValue = "";
        await this.startAiResponse();
    }

    createMessage(role: MessageRole, text: string): ChatMessage {
        return {
            id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            role,
            text,
            createdAt: new Date().toISOString(),
        };
    }

    async startAiResponse(): Promise<void> {
        if (!this.isConnected) {
            const errorMessage =
                this.connectionError ||
                "LM Studio недоступен. Попробуйте переподключиться.";

            const aiMessage = this.createMessage("ai", errorMessage);
            this.messages = [...this.messages, aiMessage];
            return;
        }

        runInAction(() => {
            this.isSending = true;
            this.abortController = new AbortController();
        });

        try {
            const apiMessages = this.messages.map(msg => ({
                role: msg.role,
                text: msg.text,
            }));

            const responseText = await lmStudioService.generateResponse(
                apiMessages,
                this.abortController?.signal
            );

            runInAction(() => {
                const aiMessage = this.createMessage("ai", responseText);
                this.messages = [...this.messages, aiMessage];
            });
        } catch (error: any) {
            console.error("Ошибка при генерации ответа:", error);

            let errorMessage = "Произошла ошибка при генерации ответа.";

            if (error.message.includes("подключиться")) {
                errorMessage = error.message;
            } else if (error.message.includes("таймаут")) {
                errorMessage = "Превышено время ожидания ответа. Попробуйте еще раз.";
            } else {
                errorMessage = `Ошибка: ${error.message}`;
            }

            runInAction(() => {
                const aiMessage = this.createMessage("ai", errorMessage);
                this.messages = [...this.messages, aiMessage];

                if (error.message.includes("подключиться")) {
                    this.isConnected = false;
                    this.connectionError = error.message;
                }
            });
        } finally {
            runInAction(() => {
                this.isSending = false;
                this.abortController = null;
            });
        }
    }

    cancelRequest(): void {
        if (this.abortController) {
            this.abortController.abort();
            this.isSending = false;
            this.abortController = null;
        }
    }

    async reconnect(): Promise<void> {
        runInAction(() => {
            this.connectionError = null;
        });
        await this.initializeConnection();
    }
}

export const chatStore = new ChatStore();
