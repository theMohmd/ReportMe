import axios from "axios";
import { getCookie } from "utils/cookie";
import { userProjectType } from "types/userProjectType";

//not used
//post user-projects
export type apiPostUserProjectsInputType = { user_supervisor_id: number; project_id: number }
export type apiPostUserProjectsOutputType = userProjectType

export const apiPostUserProjects
: ( input: apiPostUserProjectsInputType ) => Promise<apiPostUserProjectsOutputType>
= async (input) => {
    return axios
    .post("http://127.0.0.1:8000/api/user-projects",
        input,
        {
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data)
}

