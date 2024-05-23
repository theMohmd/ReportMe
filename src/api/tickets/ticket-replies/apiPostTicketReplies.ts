import axios from "axios";
import { ticketReplyType } from "src/types/ticketReplyType";
import { getCookie } from "src/utils/cookie";

//post ticket-replies
export type apiPostTicketRepliesInputType = { ticket_id:number; content: string; file?: File }
export type apiPostTicketRepliesOutputType = ticketReplyType

export const apiPostTicketReplies
: ( input: apiPostTicketRepliesInputType ) => Promise<apiPostTicketRepliesOutputType>
= async ( input ) => {
    return axios
    .post(`http://127.0.0.1:8000/api/tickets/${input.ticket_id}/ticket-replies`, input, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

