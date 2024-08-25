//import axios from "axios";
import { demoMessageReplies } from "src/api/demoDb/messageReplies";
import { messageReplyType } from "src/types/messageReplyType";
//import { getCookie } from "src/utils/cookie";

//post message-replies
export type apiPostMessageRepliesInputType = {
  message_id: number;
  content: string;
  file?: File;
};
export type apiPostMessageRepliesOutputType = messageReplyType;

// export const apiPostMessageReplies: (
//   input: apiPostMessageRepliesInputType,
// ) => Promise<apiPostMessageRepliesOutputType> = async (input) => {
//   return axios
//     .post(
//       `http://127.0.0.1:8000/api/messages/${input.message_id}/message-replies`,
//       input,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: "Bearer " + getCookie("token"),
//         },
//       },
//     )
//     .then((res) => res.data.data);
// };
export const apiPostMessageReplies: (
  input: apiPostMessageRepliesInputType,
) => Promise<apiPostMessageRepliesOutputType> = async (input) => {
  console.log(input);
  console.log("this feature isn't available in demo");
  return new Promise((res) =>
    setTimeout(() => res(demoMessageReplies[0]), 500),
  );
};
