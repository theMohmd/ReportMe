import axios from "axios";
import { getCookie } from "utils/cookie";

export const apiGetMesseges = async (id?: number) => {
    return axios.get(
        `http://127.0.0.1:8000/api/messages${id ? "/" + id : ""}`,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
            },
        }
    );
};
