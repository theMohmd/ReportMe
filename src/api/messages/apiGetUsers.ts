import axios from "axios";
import { getCookie } from "src/utils/cookie";

//get all users(search user)
//search by input with given mode(email / username)
export const apiGetUsers = async (input: string, mode: string) => {
    return axios.get("http://127.0.0.1:8000/api/users", {
        params:
            mode === "email"
                ? {
                      email: input,
                  }
                : {
                      name: input,
                  },
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
    }).then((res) => res.data.data[0].data);
};
