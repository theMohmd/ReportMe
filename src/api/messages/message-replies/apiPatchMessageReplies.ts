import axios from "axios";
import { messageReplyType } from "src/types/messageReplyType";
import { getCookie } from "src/utils/cookie";

//post message-replies
export type apiPatchMessageRepliesInputType = { message_reply: number; content?: string, file?: File }
export type apiPatchMessageRepliesOutputType = messageReplyType

export const apiPatchMessageReplies
: ( input: apiPatchMessageRepliesInputType ) => Promise<apiPatchMessageRepliesOutputType>
= async ( input ) => {
    const {message_reply, ...rest} = input
    return axios
    .post(`http://127.0.0.1:8000/api/message-replies/${message_reply}`, rest, {
        params:{_method:"put"},
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

