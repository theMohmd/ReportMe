// import axios from "axios";
// import { getCookie } from "utils/cookie";

//post supervisor request
export type postUserSupervisorType = { supervisor_id: number };
// export const apiPostUserSupervisor = async (data: postUserSupervisorType) => {
//   return axios.post("http://127.0.0.1:8000/api/user-supervisors", data, {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: "Bearer " + getCookie("token"),
//     },
//   });
// };
export const apiPostUserSupervisor = async (data: postUserSupervisorType) => {
  console.log(data);
  console.log("this feature isn't available in demo")
  return new Promise((res) =>
    setTimeout(
      () =>
        res({}),
      500,
    ),
  );
};
