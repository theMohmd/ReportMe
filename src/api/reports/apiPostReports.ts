import axios from "axios";
import { getCookie } from "src/utils/cookie";

//Report post request
export type postReportType = {
    user_project_id: number;
    title: string;
    description: string;
};
export const apiPostReport = async (data: postReportType) => {
    return axios.post("http://127.0.0.1:8000/api/reports", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    });
};
