import axios from "axios";
import { messageType } from "types/messageType";
import { getCookie } from "utils/cookie";

//patch messages
export type apiPatchMessagesInputType = { id: number; content?: string; title?: string; file?: File | "" }
export type apiPatchMessagesOutputType = messageType

export const apiPatchMessages
: ( input: apiPatchMessagesInputType ) => Promise<apiPatchMessagesOutputType>
= async ( input ) => {
    const {id, ...rest} = input
    return axios
    .post(`http://127.0.0.1:8000/api/messages/${id}`, rest, {
        params:{_method:"put"},
        headers:{
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}


