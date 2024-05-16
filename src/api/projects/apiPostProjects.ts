import axios from "axios";
import { getCookie } from "utils/cookie";
import { projectType } from "src/types/projectType";

//post projects
export type apiPostProjectsInputType = { title:string,description:string; }
export type apiPostProjectsOutputType = projectType

export const apiPostProjects
:( input: apiPostProjectsInputType ) => Promise<apiPostProjectsOutputType>
= async (input) => {
    return axios
    .post("http://127.0.0.1:8000/api/projects",
        input,
        {
            params:{},
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

