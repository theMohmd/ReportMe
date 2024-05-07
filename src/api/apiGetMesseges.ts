import axios from "axios";
import { getCookie } from "utils/cookie";

export const apiGetMesseges = async () => {
    await new Promise((r) => setTimeout(r, 5000));
    return axios.get("http://127.0.0.1:8000/api/messages", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    });
};
