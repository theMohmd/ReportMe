import { demoMessageReplies } from "src/api/demoDb/messageReplies";
import { apiDataType } from "src/types/apiDataType";
import { messageReplyType } from "src/types/messageReplyType";
// import axios from "axios";
// import { getCookie } from "src/utils/cookie";

// get message-replies
export type apiGetMessageRepliesInputType = {
  message: number;
  page?: number;
};
export type apiGetMessageRepliesOutputType = apiDataType<messageReplyType>;

// export const apiGetMessageReplies: (
//   input: apiGetMessageRepliesInputType,
// ) => Promise<apiGetMessageRepliesOutputType> = async (input) => {
//   return axios
//     .get(
//       `http://127.0.0.1:8000/api/messages/${input.message}/message-replies`,
//       {
//         params: { page: input.page ? input.page : undefined },
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: "Bearer " + getCookie("token"),
//         },
//       },
//     )
//     .then((res) => res.data.data[0]);
// };
export const apiGetMessageReplies: (
  input: apiGetMessageRepliesInputType,
) => Promise<apiGetMessageRepliesOutputType> = async (input) => {
  console.log(input);
  return new Promise((res) =>
    setTimeout(
      () =>
        res(
          input.message === 0
            ? {
                data: demoMessageReplies,
                total: demoMessageReplies.length,
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
              }
            : {
                data: [],
                total: 0,
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
              },
        ),
      500,
    ),
  );
};
