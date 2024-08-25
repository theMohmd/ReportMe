//import axios from "axios";
import { apiDataType } from "types/apiDataType";
import { messageType } from "types/messageType";
import { demoMessages } from "../demoDb/messages";
//import { getCookie } from "utils/cookie";

// get messages with page
export type apiGetMessagesInputType = {
  page: number;
};
export type apiGetMessagesOutputType = apiDataType<messageType>;

// export const apiGetMessages: (
//   input: apiGetMessagesInputType,
// ) => Promise<apiGetMessagesOutputType> = async (input = { page: 1 }) => {
//   return axios
//     .get("http://127.0.0.1:8000/api/messages", {
//       params: { page: input.page },
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + getCookie("token"),
//       },
//     })
//     .then((res) => res.data.data[0]);
// };
export const apiGetMessages: (
  input: apiGetMessagesInputType,
) => Promise<apiGetMessagesOutputType> = async (
  input = {
    page: 1,
  },
) => {
  console.log(input);
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          data: demoMessages,
          total: demoMessages.length,
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
