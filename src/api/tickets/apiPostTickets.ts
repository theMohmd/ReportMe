import axios from "axios";
import { ticketType } from "src/types/ticketType";
import { getCookie } from "src/utils/cookie";

//post tickets
export type apiPostTicketsInputType = { title: string; desctription: string }
export type apiPostTicketsOutputType = ticketType

export const apiPostTickets
: ( input: apiPostTicketsInputType ) => Promise<apiPostTicketsOutputType>
= async ( input ) => {
    return axios
    .post("http://127.0.0.1:8000/api/tickets",
        input, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

