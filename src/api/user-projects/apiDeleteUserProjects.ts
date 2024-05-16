import axios from "axios";
import { getCookie } from "src/utils/cookie";

//delete user-projects
export type apiDeleteUserProjectsInputType = { id:number; }
export type apiDeleteUserProjectsOutputType = { message: string }

export const apiDeleteUserProjects
: ( input: apiDeleteUserProjectsInputType ) => Promise<apiDeleteUserProjectsOutputType>
= async ( input ) => {
    return axios
    .delete(`http://127.0.0.1:8000/api/user-projects/${input.id}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data)
}

