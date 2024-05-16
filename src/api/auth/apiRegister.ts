import axios from "axios";
import { userType } from "src/types/userType";

//register request
export type apiRegisterInputType = { name: string; email: string; password: string; };
export type apiRegisterOutputType = { user: userType; token: string };

export const apiRegister 
: ( input : apiRegisterInputType ) => Promise<apiRegisterOutputType>
= async ( input ) => {
    return axios
    .post("http://localhost:8000/api/auth/register", input, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    .then((res) => {
        return { user: res.data.user, token: res.data.token };
    });
};
