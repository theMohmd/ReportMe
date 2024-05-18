import axios from "axios";
import { getCookie } from "utils/cookie";
import { messageType } from "types/messageType";

//get messages
export type apiGetMessagesIdInputType = { id: number }
export type apiGetMessagesIdOutputType = messageType

export const apiGetMessagesId
: ( input: apiGetMessagesIdInputType ) => Promise<apiGetMessagesIdOutputType>
= async ( input ) => {
    return axios
    .get(`http://127.0.0.1:8000/api/messages/${input.id}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

