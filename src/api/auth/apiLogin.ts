import axios from "axios";
import { userType } from "src/types/userType";

//login request
export type apiLoginInputType = { email: string; password: string };
export type apiLoginOutputType = { token: string; user: userType };

export const apiLogin: (
    input: apiLoginInputType
) => Promise<apiLoginOutputType> = async (input) => {
    return axios
        .post("http://127.0.0.1:8000/api/auth/login", input, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        .then((res) => res.data);
};
