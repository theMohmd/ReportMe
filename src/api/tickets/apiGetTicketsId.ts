import axios from "axios";
import { ticketType } from "src/types/ticketType";
import { getCookie } from "src/utils/cookie";

//get tickets
export type apiGetTicketsIdInputType = { id: number; }
export type apiGetTicketsIdOutputType = ticketType

export const apiGetTicketsId
: ( input: apiGetTicketsIdInputType ) => Promise<apiGetTicketsIdOutputType>
= async ( input ) => {
    return axios
    .get(`http://127.0.0.1:8000/api/tickets/${input.id}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

