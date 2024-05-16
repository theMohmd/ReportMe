import axios from "axios";
import { userSupervisorType } from "src/types/userSupervisorType";
import { getCookie } from "src/utils/cookie";

//get user-supervisors 
export type apiGetUserSupervisorsIdInputType = { id: number; }
export type apiGetUserSupervisorsIdOutputType = userSupervisorType

export const apiGetUserSupervisorsId
: ( input: apiGetUserSupervisorsIdInputType ) => Promise<apiGetUserSupervisorsIdOutputType>
= async ( input ) => {
    return axios
    .get(`http://127.0.0.1:8000/api/user-supervisors/${input.id}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

