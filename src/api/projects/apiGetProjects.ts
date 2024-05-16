import axios from "axios";
import { apiDataType } from "types/apiDataType";
import { projectType } from "types/projectType";
import { getCookie } from "utils/cookie";

//get projects with page
export type apiGetProjectsInputType = { page: number };
export type apiGetProjectsOutputType = apiDataType<projectType>;

export const apiGetProjects
: ( input: apiGetProjectsInputType) => Promise<apiGetProjectsOutputType> 
= async (input) => {
    return axios
        .get("http://127.0.0.1:8000/api/projects", {
            params: { page: input.page },
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
            },
        })
        .then((res) => res.data.data[0]);
};
