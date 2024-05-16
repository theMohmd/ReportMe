import axios from "axios";
import { getCookie } from "utils/cookie";

//get user-supervisor list 
export const apiGetUserSupervisor = async (input: string, mode: string) => {
    return axios.get("http://127.0.0.1:8000/api/user-supervisors", {
        params:
            mode === "email"
                ? {
                      email: input,
                  }
                : {
                      name: input,
                  },
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    });
};
