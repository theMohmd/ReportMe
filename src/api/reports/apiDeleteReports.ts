import axios from "axios";
import { getCookie } from "src/utils/cookie";

//delete reports
export type apiDeleteReportsInputType = { id:number; }
export type apiDeleteReportsOutputType = { message: string }

export const apiDeleteReports
: ( input: apiDeleteReportsInputType ) => Promise<apiDeleteReportsOutputType>
= async ( input ) => {
    return axios
    .delete(`http://127.0.0.1:8000/api/reports/${input.id}`, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data)
}

