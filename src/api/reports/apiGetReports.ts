import axios from "axios";
import { getCookie } from "utils/cookie";


//get reports
//if id in input: get specific report with given id
//if page in input: get specific page of reports
export const apiGetReports = async (input: { id?: number; page?: number }) => {
    return axios
        .get(
            `http://127.0.0.1:8000/api/reports${
                input.id ? "/" + input.id : ""
            }`,
            {
                params: input.page ? { page: input.page } : undefined,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + getCookie("token"),
                },
            }
        )
        .then((res) => res.data);
};

