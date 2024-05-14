import axios from "axios";
import { getCookie } from "utils/cookie";

export const apiGetUserProjects = async (input: {
    id?: number;
    page?: number;
}) => {
    return axios
        .get(
            `http://127.0.0.1:8000/api/user-projects${
                input.id ? "/" + input.id : ""
            }`,
            {
                params: input.page ? { page: input.page } : undefined,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + getCookie("token"),
                },
            }
        )
        .then((res) => res.data);
};
