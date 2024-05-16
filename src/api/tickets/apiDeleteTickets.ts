import axios from "axios";
import { getCookie } from "src/utils/cookie";

//delete tickets
export type apiDeleteTicketsInputType = { id:number; }
export type apiDeleteTicketsOutputType = { message: string }

export const apiDeleteTickets
: ( input: apiDeleteTicketsInputType ) => Promise<apiDeleteTicketsOutputType>
= async ( input ) => {
    return axios
    .delete(`http://127.0.0.1:8000/api/tickets/${input.id}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data)
}

