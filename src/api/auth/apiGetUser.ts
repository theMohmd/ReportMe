import axios from "axios";
import { userType } from "src/types/userType";
import { getCookie } from "src/utils/cookie";

//get user info. by token(check token)
export type apiGetAuthOutputType = userType

export const apiGetAuth 
: () => Promise<apiGetAuthOutputType>
= async () => {
    return axios
    .get("http://127.0.0.1:8000/api/auth", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.user)
};
