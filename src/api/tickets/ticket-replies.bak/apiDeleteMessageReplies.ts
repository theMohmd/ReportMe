import axios from "axios";
import { getCookie } from "src/utils/cookie";

//delete message-replies
export type apiDeleteMessageRepliesInputType = { id:number; }
export type apiDeleteMessageRepliesOutputType = {message: string }

export const apiDeleteMessageReplies
: ( input: apiDeleteMessageRepliesInputType ) => Promise<apiDeleteMessageRepliesOutputType>
= async ( input ) => {
    return axios
    .delete(`http://127.0.0.1:8000/api/message-replies/${input.id}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data)
}

