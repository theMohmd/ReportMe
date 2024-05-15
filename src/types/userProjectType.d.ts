import { projectType } from "./projectType";
import { userType } from "./userType";

export type userProjectType = {
    created_at: string;
    id: number;
    project: projectType;
    updated_at: string;
    user: userType;
};
