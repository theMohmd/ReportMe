import axios from "axios";
import { ticketReplyType } from "src/types/ticketReplyType";
import { getCookie } from "src/utils/cookie";

//post ticket-replies
export type apiPatchTicketRepliesInputType = { ticket_reply: number; content?: string, file?: File }
export type apiPatchTicketRepliesOutputType = ticketReplyType

export const apiPatchTicketReplies
: ( input: apiPatchTicketRepliesInputType ) => Promise<apiPatchTicketRepliesOutputType>
= async ( input ) => {
    const {ticket_reply, ...rest} = input
    return axios
    .post(`http://127.0.0.1:8000/api/ticket-replies/${ticket_reply}`, rest, {
        params:{_method:"put"},
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

