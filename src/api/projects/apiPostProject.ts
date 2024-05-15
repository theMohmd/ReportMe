import axios from "axios";
import { getCookie } from "utils/cookie";

//project post request
export type postProjectType = { title: string; description: string; };
export const apiPostProject = async (data: postProjectType) => {
    return axios.post("http://127.0.0.1:8000/api/projects", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    });
};
