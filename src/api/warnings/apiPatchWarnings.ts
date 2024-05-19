import axios from "axios";
import { warningType } from "types/warningType";
import { getCookie } from "utils/cookie";

//patch warnings
export type apiPatchWarningsInputType = { id: number; title?: string; description?: string; file?: File | "" }
export type apiPatchWarningsOutputType = warningType

export const apiPatchWarnings
: ( input: apiPatchWarningsInputType ) => Promise<apiPatchWarningsOutputType>
= async ( input ) => {
    const {id, ...rest} = input
    return axios
    .post(`http://127.0.0.1:8000/api/warnings/${id}`, rest, {
        params:{_method:"put"},
        headers:{
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}


