import axios from "axios";
import { toast } from "react-toastify";

const baseUrlResearch = "https://triapi.ru/research";


export const reserchInstance = axios.create({
    baseURL: baseUrlResearch + "/api",
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
    },
})

reserchInstance.interceptors.request.use((config) => {

    const userId = localStorage.getItem('user_id');
    if (userId && userId === "99999" && config.method !== "get") {
        return Promise.reject(new Error(config.method + " blocked by meta flag"))
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.dateAuthConnect && user.baseRole != 5) {
        try {
            const lastAuthDate = new Date(user.dateAuthConnect);
            const currentDate = new Date();
            const timeDiff = currentDate.getTime() - lastAuthDate.getTime();
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));
            if (minutesDiff > 30) {
                removeUserNavigateOut()
            }
        } catch (error) {
            removeUserNavigateOut()
        }
    } else {
        removeUserNavigateOut()
    }


    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config;
})

reserchInstance.interceptors.response.use(function (response) {
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
            return reserchInstance.request(originalRequest)
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    console.log(error);
    throw error;
});


function removeUserNavigateOut() {
    localStorage.setItem('logout', "Время сессии истекло. Требуется повторная авторизация");
    window.location.href = "/";
}