import axios from "axios";
import { getCookie } from "utils/cookie";

//delete message request
export type deleteMessageType = {id:number};
export const apiDeleteMessage = async (input: deleteMessageType) => {
    return axios
        .delete(`http://127.0.0.1:8000/api/messages/${input.id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
            },
        })
        .then((res) => res.data);
};
