import axios from "axios";
import { postMessageType } from "types/postMessageType";
import { getCookie } from "utils/cookie";

//pose message request
export const apiPostMessage = async (data: postMessageType) => {
    return axios.post("http://127.0.0.1:8000/api/messages", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    });
};
