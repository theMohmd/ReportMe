import axios from "axios";
import { apiDataType } from "src/types/apiDataType";
import { ticketReplyType } from "src/types/ticketReplyType";
import { getCookie } from "src/utils/cookie";

//get ticket-replies
export type apiGetTicketRepliesInputType = { ticket: number, page?:number }
export type apiGetTicketRepliesOutputType = apiDataType<ticketReplyType>

export const apiGetTicketReplies
: ( input: apiGetTicketRepliesInputType ) => Promise<apiGetTicketRepliesOutputType>
= async ( input ) => {
    return axios
    .get(`http://127.0.0.1:8000/api/tickets/${input.ticket}/ticket-replies`, {
        params:{page: input.page ? input.page : undefined},
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data[0])
}

