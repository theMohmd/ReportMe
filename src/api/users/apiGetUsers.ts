import axios from "axios";
import { userType } from "types/userType";
import { getCookie } from "utils/cookie";

//get all users(search user)
//search by input with given mode(email / username)
export type apiGetUsersInputType = { input: string; mode: string };
export type apiGetUsersOutputType = userType[];

export const apiGetUsers = async (
    data: apiGetUsersInputType = { input: "", mode: "" }
) => {
    return axios
        .get("http://127.0.0.1:8000/api/users", {
            params:
                data.mode === "email"
                    ? { email: data.input }
                    : { name: data.input },
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + getCookie("token"),
            },
        })
        .then((res) => res.data.data[0].data);
};
