import axios from "axios";
import { postProjectType } from "src/types/projects/postProjectType";
import { getCookie } from "utils/cookie";
export const apiPostProject = async (data: postProjectType) => {
    return axios.post("http://127.0.0.1:8000/api/projects", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    });
};
