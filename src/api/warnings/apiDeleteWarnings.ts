import axios from "axios";
import { getCookie } from "src/utils/cookie";

//delete warnings
export type apiDeleteWarningsInputType = { id:number; }
export type apiDeleteWarningsOutputType = { message: string }

export const apiDeleteWarnings
: ( input: apiDeleteWarningsInputType ) => Promise<apiDeleteWarningsOutputType>
= async ( input ) => {
    return axios
    .delete(`http://127.0.0.1:8000/api/warnings/${input.id}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data)
}

