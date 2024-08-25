//import axios from "axios";
import { projectType } from "types/projectType";
import { demoProjects } from "../demoDb/projects";
//import { getCookie } from "utils/cookie";

//patch projects
export type apiPatchProjectsInputType = {
  id: number;
  title?: string;
  description?: string;
  deadline?: Date;
  file?: File | "";
};
export type apiPatchProjectsOutputType = projectType;

// export const apiPatchProjects: (
//   input: apiPatchProjectsInputType,
// ) => Promise<apiPatchProjectsOutputType> = async (input) => {
//   const { id, ...rest } = input;
//   return axios
//     .post(`http://127.0.0.1:8000/api/projects/${id}`, rest, {
//       params: { _method: "put" },
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Accept: "application/json",
//         Authorization: "Bearer " + getCookie("token"),
//       },
//     })
//     .then((res) => res.data.data);
// };
export const apiPatchProjects: (
  input: apiPatchProjectsInputType,
) => Promise<apiPatchProjectsOutputType> = async (input) => {
  const { id, ...rest } = input;
  console.log(rest);
  console.log("this feature isn't available in demo")
  return new Promise((res) =>
    setTimeout(
      () =>
        res(demoProjects[id]),
      500,
    ),
  );
};
