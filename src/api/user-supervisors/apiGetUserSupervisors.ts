// import axios from "axios";
// import { getCookie } from "utils/cookie";
import { apiDataType } from "types/apiDataType";
import { userSupervisorType } from "types/userSupervisorType";
import { demoUserSupervisors } from "../demoDb/userSupervisors";

//get user-supervisors
export type apiGetUserSupervisorsInputType = {
  input: string;
  mode: string; //search mode
  page: number;
};
export type apiGetUserSupervisorsOutputType = apiDataType<userSupervisorType>;

// export const apiGetUserSupervisors: (
//   input?: apiGetUserSupervisorsInputType,
// ) => Promise<apiGetUserSupervisorsOutputType> = async (
//   input = { input: "", mode: "", page: 1 },
// ) => {
//   return axios
//     .get("http://127.0.0.1:8000/api/user-supervisors", {
//       params:
//         input.mode === "email"
//           ? { page: input.page, email: input.input }
//           : { page: input.page, name: input.input },
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + getCookie("token"),
//       },
//     })
//     .then((res) => res.data.data[0]);
// };
export const apiGetUserSupervisors: (
  input?: apiGetUserSupervisorsInputType,
) => Promise<apiGetUserSupervisorsOutputType> = async (
  input = { input: "", mode: "", page: 1 },
) => {
  console.log(input);
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          data: demoUserSupervisors,
          total: demoUserSupervisors.length,
          from: 0,
          to: 0,
          first_page_url: "unimportant",
          per_page: 10,
          prev_page_url: "unimportant",
          current_page: 1,
          next_page_url: "unimportant",
          last_page: 10,
          last_page_url: "unimportant",
          path: "unimportant",
        }),
      500,
    ),
  );
};
