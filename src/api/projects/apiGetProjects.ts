//import axios from "axios";
import { apiDataType } from "types/apiDataType";
import { projectType } from "types/projectType";
//import { getCookie } from "utils/cookie";
import { demoProjects } from "../demoDb/projects";

//get projects with page
export type apiGetProjectsInputType = { page: number };
export type apiGetProjectsOutputType = apiDataType<projectType>;

// export const apiGetProjects: (
//   input: apiGetProjectsInputType,
// ) => Promise<apiGetProjectsOutputType> = async (input) => {
//   return axios
//     .get("http://127.0.0.1:8000/api/projects", {
//       params: { page: input.page },
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + getCookie("token"),
//       },
//     })
//     .then((res) => res.data.data[0]);
// };
export const apiGetProjects: (
  input: apiGetProjectsInputType,
) => Promise<apiGetProjectsOutputType> = async (input) => {
  console.log(input);
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          data: demoProjects,
          total: demoProjects.length,
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
