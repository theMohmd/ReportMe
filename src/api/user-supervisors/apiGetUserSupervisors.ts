import axios from "axios";
import { getCookie } from "utils/cookie";
import { apiDataType } from "types/apiDataType";
import { userSupervisorType } from "types/userSupervisorType";

//get user-supervisors
export type apiGetUserSupervisorsInputType = {
    input: string;
    mode: string;
    page: number;
};
export type apiGetUserSupervisorsOutputType = apiDataType<userSupervisorType>;

export const apiGetUserSupervisors: (
    input?: apiGetUserSupervisorsInputType
) => Promise<apiGetUserSupervisorsOutputType> = async (
    input = { input: "", mode: "", page: 1 }
) => {
    return axios
        .get("http://127.0.0.1:8000/api/user-supervisors", {
            params:
                input.mode === "email"
                    ? { page: input.page, email: input.input }
                    : { page: input.page, name: input.input },
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
            },
        })
        .then((res) => res.data.data[0]);
};
