import axios from "axios";
import { getCookie } from "utils/cookie";
export type postUserProjectType = { user_id: number; project_id: number };
export const apiPostUserProject = async (data: postUserProjectType) => {
    return axios.post("http://127.0.0.1:8000/api/user-projects", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    });
};
