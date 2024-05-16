import axios from "axios";
import { apiDataType } from "src/types/apiDataType";
import { messageType } from "src/types/messageType";
import { getCookie } from "utils/cookie";

//get message with id
export type apiGetMessegesInputType = { page: number };
export type apiGetMessegesOutputType = apiDataType<messageType>;

export const apiGetMesseges = async (
    input: apiGetMessegesInputType = { page: 1 }
) => {
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
