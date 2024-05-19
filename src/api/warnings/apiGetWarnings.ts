import axios from "axios";
import { getCookie } from "src/utils/cookie";
import { apiDataType } from "types/apiDataType";
import { warningType } from "types/warningType";

//get warnings
export type apiGetWarningsInputType = { page: number };
export type apiGetWarningsOutputType = apiDataType<warningType>;

export const apiGetWarnings
: ( input: apiGetWarningsInputType) => Promise<apiGetWarningsOutputType> 
= async (input) => {
    return axios
    .get("http://127.0.0.1:8000/api/warnings", {
        params: { page: input.page },
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then((res) => res.data.data[0]);
};
