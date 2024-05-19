import axios from "axios";
import { warningType } from "src/types/warningType";
import { getCookie } from "src/utils/cookie";

//post warnings
export type apiPostWarningsInputType = { title: string; desctription: string; file: File | undefined;  }
export type apiPostWarningsOutputType = warningType

export const apiPostWarnings
: ( input: apiPostWarningsInputType ) => Promise<apiPostWarningsOutputType>
= async ( input ) => {
    return axios
    .post("http://127.0.0.1:8000/api/warnings", input, {
        headers:{
            'Content-Type': 'multipart/form-data',
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    })
    .then(res=>res.data.data)
}

