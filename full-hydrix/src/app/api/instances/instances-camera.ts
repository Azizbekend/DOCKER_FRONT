import axios from "axios";

const baseUrl = "http://hydrig.gsurso.ru/camera";


export const reserchCamera = axios.create({
    baseURL: baseUrl + "/api/cameras",
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
    },
})

reserchCamera.interceptors.request.use((config) => { return config });
reserchCamera.interceptors.response.use(function (response) { return response });