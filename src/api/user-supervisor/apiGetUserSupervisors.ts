import axios from "axios";
import { getCookie } from "utils/cookie";

//get supervisor request
export const apiGetUserSupervisor = async () => {
    return axios.post("http://127.0.0.1:8000/api/user-supervisors", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    });
};
