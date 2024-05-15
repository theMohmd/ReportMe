import axios from "axios";

//login request
export type loginDataType = { email: string; password: string };
export const apiLogin = async (data: loginDataType) => {
    return axios.post("http://127.0.0.1:8000/api/auth/login", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
};
