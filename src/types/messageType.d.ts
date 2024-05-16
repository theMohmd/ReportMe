import { userType } from "./userType";

export type messageType = {
    id: number;
    title: string;
    content: string;
    file: string;
    sender: userType;
    receiver: userType;
    updated_at: string;
    created_at: string;
};
