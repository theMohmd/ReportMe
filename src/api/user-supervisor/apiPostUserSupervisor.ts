import axios from "axios";
import { getCookie } from "utils/cookie";

//post supervisor request
export type postUserSupervisorType = { supervisor_id: number };
export const apiPostUserSupervisor = async (data: postUserSupervisorType) => {
    return axios.post("http://127.0.0.1:8000/api/user-supervisors", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    });
};
