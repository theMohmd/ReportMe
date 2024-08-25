// import axios from "axios";
// import { getCookie } from "utils/cookie";

//delete messages
export type apiDeleteMessagesInputType = { id: number };
export type apiDeleteMessagesOutputType = { message: string };

// export const apiDeleteMessages: (
//   input: apiDeleteMessagesInputType,
// ) => Promise<apiDeleteMessagesOutputType> = async (input) => {
//   return axios
//     .delete(`http://127.0.0.1:8000/api/messages/${input.id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + getCookie("token"),
//       },
//     })
//     .then((res) => res.data);
// };
export const apiDeleteMessages: (
  input: apiDeleteMessagesInputType,
) => Promise<apiDeleteMessagesOutputType> = async (input) => {
  console.log(input);
  console.log("deleting isnt available in demo");
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          message: "this is demo",
        }),
      500,
    ),
  );
};
