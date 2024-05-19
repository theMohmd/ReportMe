import { projectType } from "./projectType";
import { userType } from "./userType";

export type warningType = {
    id: number;
    user: userType;
    project: projectType;
};
