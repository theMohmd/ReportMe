import { projectType } from "./projectType";
import { userType } from "./userType";

export type warningType = {
    id: number;
    user: userType;
    project: projectType;
    description: string;
    score: null;
    file: File | null;
    updated_at: string;
    created_at: string;
};
