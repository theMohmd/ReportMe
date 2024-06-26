import axios from "axios";
import { reportType } from "src/types/reportType";
import { getCookie } from "src/utils/cookie";

//post reports
export type apiPutReportsScoreInputType = { report: number; score: number }
export type apiPutReportsScoreOutputType = reportType

export const apiPutReportsScore
: ( input: apiPutReportsScoreInputType ) => Promise<apiPutReportsScoreOutputType>
= async ( input ) => {
    return axios
    .put(`http://127.0.0.1:8000/api/reports/${input.report}/score`, { score: input.score }, {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data.data)
}

