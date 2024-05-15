import { userType } from "types/auth";
import { projectType } from "types/projects/projectType";

export type reportType = {
    id: number;
    created_at: string;
    project: projectType;
    updated_at: string;
    user: userType;
    description: string;
    file: string;
    score: number | null;
    updated_at: string;
};
