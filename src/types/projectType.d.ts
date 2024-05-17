import { userType } from "../auth";

export type projectType = {
    id: number;
    title: string;
    description: string;
    deadline: null;
    file: string | null;
    user: userType;
    created_at: string;
    updated_at: string;
};
