import { ticketType } from "./ticketType";
import { userType } from "./userType";

export type ticketReplyType = {
    id: number;
    content: string;
    file: null | File;
    user: userType;
    ticket: ticketType;
    created_at: string;
    updated_at: string;
};
