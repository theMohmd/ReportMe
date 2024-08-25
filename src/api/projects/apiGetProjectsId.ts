//import axios from "axios";
import { projectType } from "types/projectType";
//import { getCookie } from "utils/cookie";
import { demoProjects } from "../demoDb/projects";

//get projects
export type apiGetProjectsIdInputType = { id: number };
export type apiGetProjectsIdOutputType = projectType;

// export const apiGetProjectsId: (
//   input: apiGetProjectsIdInputType,
// ) => Promise<apiGetProjectsIdOutputType> = async (input) => {
//   return axios
//     .get(`http://127.0.0.1:8000/api/projects/${input.id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + getCookie("token"),
//       },
//     })
//     .then((res) => res.data.data);
// };
export const apiGetProjectsId: (
  input: apiGetProjectsIdInputType,
) => Promise<apiGetProjectsIdOutputType> = async (input) => {
  console.log(input);
  return new Promise((res) =>
    setTimeout(
      () =>
        res(demoProjects[input.id]),
      500,
    ),
  );
};
