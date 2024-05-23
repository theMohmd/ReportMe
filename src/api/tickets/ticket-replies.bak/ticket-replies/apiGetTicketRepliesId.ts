import axios from "axios";
import { getCookie } from "utils/cookie";
import { messageReplyType } from "src/types/messageReplyType";

//get message-replies
export type apiGetTicketRepliesIdInputType = { message_reply: string }
export type apiGetTicketRepliesIdOutputType = messageReplyType

export const apiGetTicketRepliesId
: ( input: apiGetTicketRepliesIdInputType ) => Promise<apiGetTicketRepliesIdOutputType>
= async ( input ) => {
    return axios
    .get(`http://127.0.0.1:8000/api/message-replies/${input.message_reply}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

