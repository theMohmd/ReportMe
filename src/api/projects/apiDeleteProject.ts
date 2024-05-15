import axios from "axios";
import { getCookie } from "utils/cookie";

//delete project request
export type deleteProjectType = {id:number};
export const apiDeleteProject = async (input: deleteProjectType) => {
    return axios
        .delete(`http://127.0.0.1:8000/api/projects/${input.id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
            },
        })
        .then((res) => res.data);
};
