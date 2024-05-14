import axios from "axios";
import { getCookie } from "utils/cookie";

//get messages
//if id in input: get specific message with given id
//if page in input: get specific page of messages
export const apiGetMesseges = async (input: { id?: number; page?: number }={}) => {
    return axios.get(
        `http://127.0.0.1:8000/api/messages${input.id ? "/" + input.id : ""}`,
        {
            params: input.page ? { page: input.page } : undefined,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
            },
        }
    );
};
