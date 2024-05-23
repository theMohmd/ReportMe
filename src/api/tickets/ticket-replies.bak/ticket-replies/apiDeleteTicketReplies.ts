import axios from "axios";
import { getCookie } from "src/utils/cookie";

//delete message-replies
export type apiDeleteTicketRepliesInputType = { id:number; }
export type apiDeleteTicketRepliesOutputType = {message: string }

export const apiDeleteTicketReplies
: ( input: apiDeleteTicketRepliesInputType ) => Promise<apiDeleteTicketRepliesOutputType>
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

