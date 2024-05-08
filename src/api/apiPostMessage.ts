import axios from "axios";
import { getCookie } from "utils/cookie";
type apiPostMessageType = {
    receiver_id: number;
    title: string;
    content: string;
};
export const apiPostMessage = async (data: apiPostMessageType) => {
    return axios.post("http://127.0.0.1:8000/api/messages",data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    });
};
