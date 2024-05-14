import axios from "axios";
import { deleteProjectType } from "src/types/projects/deleteProjectType";
import { getCookie } from "utils/cookie";

//delete project request
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
