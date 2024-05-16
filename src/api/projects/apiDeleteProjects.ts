import axios from "axios";
import { getCookie } from "utils/cookie";

//delete projects
export type apiDeleteProjectsInputType = { id:number; }
export type apiDeleteProjectsOutputType = {message:string}

export const apiDeleteProjects
: ( input: apiDeleteProjectsInputType ) => Promise<apiDeleteProjectsOutputType>
= async (input) => {
    return axios
    .delete(`http://127.0.0.1:8000/api/projects/${input.id}`,
        {
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data)
}

