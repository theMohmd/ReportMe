import axios from "axios";
import { loginDataType } from "types/loginDataType";
export const apiLogin = async (data: loginDataType) => {
    axios.interceptors.request.use(function (config) {
        config.headers.Authorization = "";
        return config;
    });
    return axios.post("http://127.0.0.1:8000/api/auth/login", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
};
