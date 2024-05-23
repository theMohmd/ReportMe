import axios from "axios";
import { apiDataType } from "src/types/apiDataType";
import { messageReplyType } from "src/types/messageReplyType";
import { getCookie } from "src/utils/cookie";

//get message-replies
export type apiGetTicketRepliesInputType = { message: number, page?:number }
export type apiGetTicketRepliesOutputType = apiDataType<messageReplyType>

export const apiGetTicketReplies
: ( input: apiGetTicketRepliesInputType ) => Promise<apiGetTicketRepliesOutputType>
= async ( input ) => {
    return axios
    .get(`http://127.0.0.1:8000/api/messages/${input.message}/message-replies`, {
        params:{page: input.page ? input.page : undefined},
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data[0])
}

