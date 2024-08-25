// import axios from "axios";
// import { getCookie } from "utils/cookie";

//delete user-supervisors
export type apiDeleteUserSupervisorsInputType = { user_supervisor: number };
export type apiDeleteUserSupervisorsOutputType = { message: string };

// export const apiDeleteUserSupervisors: (
//   input: apiDeleteUserSupervisorsInputType,
// ) => Promise<apiDeleteUserSupervisorsOutputType> = async (input) => {
//   return axios
//     .delete(
//       `http://127.0.0.1:8000/api/user-supervisors/${input.user_supervisor}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: "Bearer " + getCookie("token"),
//         },
//       },
//     )
//     .then((res) => res.data);
// };
export const apiDeleteUserSupervisors: (
  input: apiDeleteUserSupervisorsInputType,
) => Promise<apiDeleteUserSupervisorsOutputType> = async (input) => {
  console.log(input);
  console.log("this feature isn't available in demo")
  return new Promise((res) =>
    setTimeout(
      () =>
        res({message:"message"}),
      500,
    ),
  );
};
