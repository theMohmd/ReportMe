import axios from "axios";
import { warningType } from "src/types/warningType";
import { getCookie } from "src/utils/cookie";

//get warnings
export type apiGetWarningsIdInputType = { id: number; }
export type apiGetWarningsIdOutputType = warningType

export const apiGetWarningsId
: ( input: apiGetWarningsIdInputType ) => Promise<apiGetWarningsIdOutputType>
= async ( input ) => {
    return axios
    .get(`http://127.0.0.1:8000/api/warnings/${input.id}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

