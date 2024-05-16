import axios from "axios";
import { getCookie } from "utils/cookie";
import { apiDataType } from "types/apiDataType";
import { userProjectType } from "types/userProjectType";

//get user-projects
export type apiGetUserProjectsInputType = { page?: number; project_id?: number; }
export type apiGetUserProjectsOutputType = apiDataType<userProjectType>

export const apiGetUserProjects
: ( input: apiGetUserProjectsInputType ) => Promise<apiGetUserProjectsOutputType>
= async (input) => {
    return axios
    .get("http://127.0.0.1:8000/api/user-projects",
        {
            params: {
                page: input.page ? input.page : undefined,
                project_id: input.project_id ? input.project_id : undefined,
            },
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data[0])
}

