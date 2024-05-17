import { userType } from "types/auth";
import { projectType } from "types/projects/projectType";

export type reportType = {
    id: number;
    description: string;
    file: string | null;
    score: number | null;
    user: userType;
    project: projectType;
    updated_at: string;
    created_at: string;
};
