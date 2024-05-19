import axios from "axios";
import { ticketType } from "types/ticketType";
import { getCookie } from "utils/cookie";

//patch tickets
export type apiPatchTicketsInputType = { id: number; title?: string; description?: string; file?: File | "" }
export type apiPatchTicketsOutputType = ticketType

export const apiPatchTickets
: ( input: apiPatchTicketsInputType ) => Promise<apiPatchTicketsOutputType>
= async ( input ) => {
    const {id, ...rest} = input
    return axios
    .post(`http://127.0.0.1:8000/api/tickets/${id}`, rest, {
        params:{_method:"put"},
        headers:{
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}


