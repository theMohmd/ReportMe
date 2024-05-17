import { userType } from "./userType";

export type ticketType = {
    id: number;
    user: userType;
    title: string;
    description: string;
    file: string | null;
    updated_at: string;
    created_at: string;
};
