import axios from "axios";
import { deleteMessageType } from "src/types/messages/deleteMessageType";
import { getCookie } from "utils/cookie";

//delete message request
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
