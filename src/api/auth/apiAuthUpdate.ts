import axios from "axios";
import { userType } from "src/types/userType";
import { getCookie } from "src/utils/cookie";

//put auth
export type apiAuthUpdateInputType = { name?: string; email?: string; password?: string }
export type apiAuthUpdateOutputType = userType

export const apiAuthUpdate
: ( input: apiAuthUpdateInputType ) => Promise<apiAuthUpdateOutputType>
= async ( input ) => {
    return axios
    .put("http://127.0.0.1:8000/api/auth/update", input, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.user)
}

