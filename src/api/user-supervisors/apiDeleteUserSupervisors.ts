import axios from "axios";
import { getCookie } from "utils/cookie";

//delete user-supervisors
export type apiDeleteUserSupervisorsInputType = { user_supervisor:number; }
export type apiDeleteUserSupervisorsOutputType = { message: string; }

export const apiDeleteUserSupervisors
: ( input: apiDeleteUserSupervisorsInputType ) => Promise<apiDeleteUserSupervisorsOutputType>
= async (input) => {
    return axios
    .delete(`http://127.0.0.1:/api/user-supervisors/${input.user_supervisor}`,
        {
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data)
}

