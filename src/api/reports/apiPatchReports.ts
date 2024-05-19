import axios from "axios";
import { reportType } from "types/reportType";
import { getCookie } from "utils/cookie";

//patch reports
export type apiPatchReportsInputType = { id: number; description?: string; file?: File | "" }
export type apiPatchReportsOutputType = reportType

export const apiPatchReports
: ( input: apiPatchReportsInputType ) => Promise<apiPatchReportsOutputType>
= async ( input ) => {
    const {id, ...rest} = input
    return axios
    .post(`http://127.0.0.1:8000/api/reports/${id}`, rest, {
        params:{_method:"put"},
        headers:{
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}


