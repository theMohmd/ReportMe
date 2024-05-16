import axios from "axios";
import { apiDataType } from "types/apiDataType";
import { ticketType } from "types/ticketType";

//get tickets
export type apiGetTicketsInputType = { page: number };
export type apiGetTicketsOutputType = apiDataType<ticketType>;

export const apiGetTickets
: ( input: apiGetTicketsInputType) => Promise<apiGetTicketsOutputType> 
= async (input) => {
    return axios
    .get("http://127.0.0.1:8000/api/tickets", {
        params: { page: input.page },
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    .then((res) => res.data.data[0]);
};
