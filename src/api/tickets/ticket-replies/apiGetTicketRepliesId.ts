import axios from "axios";
import { getCookie } from "utils/cookie";
import { ticketReplyType } from "src/types/ticketReplyType";

//get ticket-replies
export type apiGetTicketRepliesIdInputType = { ticket_reply: string }
export type apiGetTicketRepliesIdOutputType = ticketReplyType

export const apiGetTicketRepliesId
: ( input: apiGetTicketRepliesIdInputType ) => Promise<apiGetTicketRepliesIdOutputType>
= async ( input ) => {
    return axios
    .get(`http://127.0.0.1:8000/api/ticket-replies/${input.ticket_reply}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

