import axios from "axios";
import { getCookie } from "src/utils/cookie";

export const apiGetUser = async () =>
    axios.get("http://127.0.0.1:8000/api/auth", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:"Bearer " + getCookie("token"),
        },
    });
