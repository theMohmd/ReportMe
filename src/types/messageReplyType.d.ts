import { messageType } from "./messageType";
import { userType } from "./userType";

export type messageReplyType = {
    id: number;
    content: string;
    file: null | File;
    user: userType;
    message: messageType;
    created_at: string;
    updated_at: string;
};
