import axios from "axios";
import { messageReplyType } from "src/types/messageReplyType";
import { getCookie } from "src/utils/cookie";

//post message-replies
export type apiPostMessageRepliesInputType = { message_id:number; content: string; file?: File }
export type apiPostMessageRepliesOutputType = messageReplyType

export const apiPostMessageReplies
: ( input: apiPostMessageRepliesInputType ) => Promise<apiPostMessageRepliesOutputType>
= async ( input ) => {
    return axios
    .post(`http://127.0.0.1:8000/api/messages/${input.message_id}/message-replies`, input, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

