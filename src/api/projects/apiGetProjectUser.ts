import axios from "axios";
import { getCookie } from "utils/cookie";

export const apiGetProjectsUser = async (input: { id?: number }) => {
    return axios
        .get(
            `http://127.0.0.1:8000/api/user-projects${
                input.id ? "/" + input.id : ""
            }`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + getCookie("token"),
                },
            }
        )
        .then((res) => res.data);
};
