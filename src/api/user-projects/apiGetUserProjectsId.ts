import axios from "axios";
import { getCookie } from "utils/cookie";
import { userProjectType } from "types/userProjectType";

//get user-projects
export type apiGetUserProjectsIdInputType = { id: number; }
export type apiGetUserProjectsIdOutputType = userProjectType

export const apiGetUserProjectsId
: ( input: apiGetUserProjectsIdInputType ) => Promise<apiGetUserProjectsIdOutputType>
= async (input) => {
    return axios
    .get(`http://127.0.0.1:8000/api/user-projects/${input.id}`,
        {
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

