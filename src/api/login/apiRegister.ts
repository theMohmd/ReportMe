import axios from "axios";

//register request
export type signUpDataType = { name: string; email: string; password: string; };
export const apiRegister = async (data: signUpDataType) => {
    return axios.post("http://localhost:8000/api/auth/register", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
};
