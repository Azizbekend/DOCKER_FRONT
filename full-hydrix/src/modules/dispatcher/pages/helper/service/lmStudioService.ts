import { LM_STUDIO_CONFIG } from "../config/lmStudioConfig";

interface ChatMessage {
    role: "user" | "ai" | "assistant" | "system";
    text: string;
}

interface LMModelInfo {
    id: string;
}

interface LMModelsResponse {
    data?: LMModelInfo[];
}

class LMStudioService {
    private baseUrl: string;
    private timeout: number;
    private model: string | null;

    constructor() {
        this.baseUrl = LM_STUDIO_CONFIG.BASE_URL;
        this.timeout = LM_STUDIO_CONFIG.REQUEST_TIMEOUT;
        this.model = LM_STUDIO_CONFIG.MODEL;
    }

    async checkConnection(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/models`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.ok;
        } catch {
            return false;
        }
    }

    /**
     * Получает список доступных моделей
     */
    async getAvailableModels(): Promise<string[]> {
        try {
            const response = await fetch(`${this.baseUrl}/models`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                signal: AbortSignal.timeout(this.timeout),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: LMModelsResponse = await response.json();
            return data.data?.map(model => model.id) || [];
        } catch (error) {
            console.error("Ошибка при получении списка моделей:", error);
            return [];
        }
    }

    /**
     * Отправляет запрос к модели и получает ответ
     */
    async generateResponse(messages: ChatMessage[], signal: AbortSignal | null = null): Promise<string> {
        try {
            const formattedMessages = [
                {
                    role: "system",
                    content: LM_STUDIO_CONFIG.SYSTEM_PROMPT,
                },
                ...messages.map(msg => ({
                    role: msg.role === "ai" ? "assistant" : msg.role,
                    content: msg.text,
                })),
            ];

            const modelToUse = this.model || "default";

            const requestBody = {
                model: modelToUse,
                messages: formattedMessages,
                ...LM_STUDIO_CONFIG.GENERATION_PARAMS,
                stream: false,
            };

            const controller = new AbortController();
            if (signal) {
                signal.addEventListener("abort", () => controller.abort());
            }

            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(`${this.baseUrl}/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `HTTP error! status: ${response.status}, message: ${errorText}`
                );
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content;

            if (!content) {
                throw new Error("Пустой ответ от модели");
            }

            return content.trim();
        } catch (error: any) {
            if (error.name === "AbortError") {
                throw new Error("Запрос был прерван по таймауту");
            }

            if (error.name === "TypeError" && error.message.includes("fetch")) {
                throw new Error(
                    "Не удалось подключиться к LM Studio. Убедитесь, что сервер запущен."
                );
            }

            throw error;
        }
    }

    /**
     * Инициализирует сервис: проверяет подключение и получает модель
     */
    async initialize(): Promise<{ connected: boolean; model?: string }> {
        const connected = await this.checkConnection();

        if (!connected) {
            return { connected: false };
        }

        if (!this.model) {
            const models = await this.getAvailableModels();
            this.model = models.length > 0 ? models[0] : "default";
        }

        return {
            connected: true,
            model: this.model,
        };
    }
}

export const lmStudioService = new LMStudioService();
