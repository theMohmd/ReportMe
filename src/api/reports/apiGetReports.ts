// import axios from "axios";
// import { getCookie } from "utils/cookie";
import { apiDataType } from "types/apiDataType";
import { reportType } from "types/reportType";
import { demoReports } from "../demoDb/reports";

//get reports
export type apiGetReportsInputType = { page?: number; project_id?: number };
export type apiGetReportsOutputType = apiDataType<reportType>;

// export const apiGetReports: (
//   input: apiGetReportsInputType,
// ) => Promise<apiGetReportsOutputType> = async (input) => {
//   return axios
//     .get("http://127.0.0.1:8000/api/reports", {
//       params: {
//         page: input.page ? input.page : undefined,
//         project_id: input.project_id ? input.project_id : undefined,
//       },
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + getCookie("token"),
//       },
//     })
//     .then((res) => res.data.data[0]);
// };
export const apiGetReports: (
  input: apiGetReportsInputType,
) => Promise<apiGetReportsOutputType> = async (input) => {
  console.log(input);
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          data: demoReports,
          total: demoReports.length,
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
