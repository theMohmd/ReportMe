// import axios from "axios";
import { userType } from "src/types/userType";
import { demoUsers } from "../demoDb/users";
import { getCookie } from "src/utils/cookie";

// get user info. by token(check token)
export type apiGetAuthOutputType = userType;

// export const apiGetAuth: () => Promise<apiGetAuthOutputType> = async () => {
//   return axios
//     .get("http://127.0.0.1:8000/api/auth", {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + getCookie("token"),
//       },
//     })
//     .then((res) => res.data.user);
// };

// demo request
export const apiGetAuth: () => Promise<apiGetAuthOutputType> = async () => {
  const token = getCookie("token");
  if (token)
    return new Promise((res) => setTimeout(() => res(demoUsers[0]), 500));
  else throw new Error();
};
