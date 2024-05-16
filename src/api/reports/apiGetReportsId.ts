import axios from "axios";
import { reportType } from "types/reportType";
import { getCookie } from "utils/cookie";

//get reports 
export type apiGetReportsIdInputType = { id:number }
export type apiGetReportsIdOutputType = reportType

export const apiGetReportsId
: ( input: apiGetReportsIdInputType ) => Promise<apiGetReportsIdOutputType>
= async (input) => {
    return axios
    .get(`http://127.0.0.1:8000/api/reports/${input.id}`,
        {
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

