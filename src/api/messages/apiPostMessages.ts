import axios from "axios";
import { messageType } from "types/messageType";
import { getCookie } from "utils/cookie";

//post messages
export type apiPostMessageInputType = { receiver_id: number; title: string; content: string; file: File | undefined; }
export type apiPostMessageOutputType = messageType

export const apiPostMessage
: ( input: apiPostMessageInputType ) => Promise<apiPostMessageOutputType>
= async (input) => {
    return axios
    .post("http://127.0.0.1:8000/api/messages",
        input, {
        headers:{
            'Content-Type': 'multipart/form-data',
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

