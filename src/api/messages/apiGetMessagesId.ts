// import axios from "axios";
import { messageType } from "types/messageType";
import { demoMessages } from "../demoDb/messages";
// import { getCookie } from "utils/cookie";

// get messages
export type apiGetMessagesIdInputType = {
  id: number;
};
export type apiGetMessagesIdOutputType = messageType;

// export const apiGetMessagesId: (
//   input: apiGetMessagesIdInputType,
// ) => Promise<apiGetMessagesIdOutputType> = async (input) => {
//   return axios
//     .get(`http://127.0.0.1:8000/api/messages/${input.id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + getCookie("token"),
//       },
//     })
//     .then((res) => res.data.data);
// };
export const apiGetMessagesId: (
  input: apiGetMessagesIdInputType,
) => Promise<apiGetMessagesIdOutputType> = async (input) => {
  return new Promise((res) =>
    setTimeout(() => res(demoMessages[input.id]), 500),
  );
};
