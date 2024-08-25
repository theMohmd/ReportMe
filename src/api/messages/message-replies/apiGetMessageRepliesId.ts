//import axios from "axios";
//import { getCookie } from "utils/cookie";
import { messageReplyType } from "src/types/messageReplyType";
import { demoMessageReplies } from "src/api/demoDb/messageReplies";

//get message-replies
export type apiGetMessageRepliesIdInputType = { message_reply: string };
export type apiGetMessageRepliesIdOutputType = messageReplyType;

// export const apiGetMessageRepliesId: (
//   input: apiGetMessageRepliesIdInputType,
// ) => Promise<apiGetMessageRepliesIdOutputType> = async (input) => {
//   return axios
//     .get(`http://127.0.0.1:8000/api/message-replies/${input.message_reply}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + getCookie("token"),
//       },
//     })
//     .then((res) => res.data.data);
// };
export const apiGetMessageRepliesId: (
  input: apiGetMessageRepliesIdInputType,
) => Promise<apiGetMessageRepliesIdOutputType> = async (input) => {
  console.log(input);
  return new Promise((res) =>
    setTimeout(
      () =>
        res(demoMessageReplies[+input.message_reply]),
      500,
    ),
  );
};
