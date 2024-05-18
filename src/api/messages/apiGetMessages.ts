import axios from "axios";
import { apiDataType } from "types/apiDataType";
import { messageType } from "types/messageType";
import { getCookie } from "utils/cookie";

//get messages with page
export type apiGetMessagesInputType = { page: number };
export type apiGetMessagesOutputType = apiDataType<messageType>;

export const apiGetMessages
: ( input: apiGetMessagesInputType) => Promise<apiGetMessagesOutputType>
= async (input = { page: 1 }) => {
    return axios
    .get("http://127.0.0.1:8000/api/messages", {
        params: { page: input.page },
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then((res) => res.data.data[0]);
};

