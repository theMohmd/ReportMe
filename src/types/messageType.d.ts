import { userType } from "./userType";

export type messageType = {
  id: number;
  title: string;
  content: string;
  file: string | null;
  sender: userType;
  receiver: userType;
  created_at: string;
  updated_at: string;
  seen_at: null | string;
};
