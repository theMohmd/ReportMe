import axios from "axios";
import { getCookie } from "utils/cookie";

//delete user supervisors request
export type deleteUserSupervisorType = { user_supervisor: number };
export const apiDeleteUserSupervisor = async (input: deleteUserSupervisorType) => {
    return axios
        .delete(`http://127.0.0.1:8000/api/user-supervisors/${input.user_supervisor}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
            },
        })
        .then((res) => res.data);
};
