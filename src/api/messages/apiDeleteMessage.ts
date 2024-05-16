import axios from "axios";
import { apiDataType } from "src/types/apiDataType";
import { messageType } from "src/types/messageType";
import { getCookie } from "utils/cookie";

//delete message request
export type apiDeleteMessageInputType = { id: number };
export type apiDeleteMessageOutputType = apiDataType<messageType>;
export const apiDeleteMessages = async (input: apiDeleteMessageInputType) => {
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
