import axios from "axios";
import { getCookie } from "utils/cookie";

export const apiGetMesseges = async () => {
    return axios.get("http://127.0.0.1:8000/api/messages", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    });
};
