import axios from "axios";
import { signUpDataType } from "types/signUpDataType";
export const apiRegister = async (data: signUpDataType) => {
    return axios.post("http://localhost:8000/api/auth/register", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:null,
        },
    });
};
