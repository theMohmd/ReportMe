import axios from "axios";
import { getCookie } from "utils/cookie";

//todo
export const apiGetProjectsUser = async () => {
    return axios
        .get(
            `http://127.0.0.1:8000/api/user-projects`,
            {
                params:{email:21},
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + getCookie("token"),
                },
            }
        )
        .then((res) => res.data);
};
