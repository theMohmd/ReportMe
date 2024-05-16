import { userType } from "./userType";

export type userSupervisorType = {
    id: number;
    user: userType;
    supervisor: userType;
    updated_at: string;
    created_at: string;
};
