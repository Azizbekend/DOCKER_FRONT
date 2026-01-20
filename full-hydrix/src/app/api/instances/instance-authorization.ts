import axios from "axios";

const baseUrlResearch = "https://triapi.ru/authorization";

export const authorizationInstance = axios.create({
    baseURL: baseUrlResearch + "/api",
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
    },
})

authorizationInstance.interceptors.request.use((config) => {

    const userId = localStorage.getItem('user_id');
    if (userId && userId === "99999" && config.method !== "get") {
        return Promise.reject(new Error(config.method + " blocked by meta flag"))
    }

    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config;
})

authorizationInstance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    const originalRequest = error.config
    if (error.response && error.response.status === 401 && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const refreshToken = localStorage.getItem("refresh_token");
            const response = await axios.get<{ jwtToken: string, refreshToken: string }>('/Users/RefreshAuthorization', {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });
            localStorage.setItem("jwtToken", response.data.jwtToken);
            localStorage.setItem("refresh_token", response.data.refreshToken);
            return authorizationInstance.request(originalRequest)
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    console.log(error);
    throw error;
});