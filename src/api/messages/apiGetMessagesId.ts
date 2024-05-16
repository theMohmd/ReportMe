import axios from "axios";
import { messageType } from "types/messageType";
import { getCookie } from "utils/cookie";

//get message with given id
export type apiGetMessegesIdInputType = { id: number };
export type apiGetMessegesIdIdOutputType = messageType;

export const apiGetMessegesId
: (input: apiGetMessegesIdInputType) => Promise<apiGetMessegesIdIdOutputType>
= async (input) => {
    return axios
        .get(`http://127.0.0.1:8000/api/messages/${input.id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
            },
        })
        .then((res) => res.data.data);
};
