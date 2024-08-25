// import axios from "axios";
// import { getCookie } from "utils/cookie";
import { projectType } from "types/projectType";
import { demoProjects } from "../demoDb/projects";

//post projects
export type apiPostProjectsInputType = {
  title: string;
  description: string;
  file: File | undefined;
  deadline?: Date;
};
export type apiPostProjectsOutputType = projectType;

// export const apiPostProjects: (
//   input: apiPostProjectsInputType,
// ) => Promise<apiPostProjectsOutputType> = async (input) => {
//   return axios
//     .post("http://127.0.0.1:8000/api/projects", input, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Accept: "application/json",
//         Authorization: "Bearer " + getCookie("token"),
//       },
//     })
//     .then((res) => res.data.data);
// };
export const apiPostProjects: (
  input: apiPostProjectsInputType,
) => Promise<apiPostProjectsOutputType> = async (input) => {
  console.log(input);
  console.log("this feature isn't available in demo")
  return new Promise((res) =>
    setTimeout(
      () =>
        res(demoProjects[0]),
      500,
    ),
  );
};
