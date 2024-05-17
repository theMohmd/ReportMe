import { projectType } from "./projectType";
import { userType } from "./userType";

export type userProjectType = {
    id: number;
    user: userType;
    project: projectType;
    created_at: string;
    updated_at: string;
};
