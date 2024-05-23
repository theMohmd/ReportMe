import axios from "axios";
import { getCookie } from "src/utils/cookie";

//delete ticket-replies
export type apiDeleteTicketRepliesInputType = { id:number; }
export type apiDeleteTicketRepliesOutputType = {ticket: string }

export const apiDeleteTicketReplies
: ( input: apiDeleteTicketRepliesInputType ) => Promise<apiDeleteTicketRepliesOutputType>
= async ( input ) => {
    return axios
    .delete(`http://127.0.0.1:8000/api/ticket-replies/${input.id}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data)
}

