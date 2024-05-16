import axios from "axios";
import { getCookie } from "utils/cookie";
import { reportType } from "types/reportType";

//post reports
export type apiPostReportsInputType = { user_project_id: number; description:string; file: File | undefined;  }
export type apiPostReportsOutputType = reportType

export const apiPostReports
: ( input: apiPostReportsInputType ) => Promise<apiPostReportsOutputType>
= async (input) => {
    return axios
    .post("http://127.0.0.1:8000/api/reports", input, {
            headers:{
                'Content-Type': 'multipart/form-data',
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

