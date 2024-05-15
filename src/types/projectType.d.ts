import { userType } from "../auth";

export type projectType = {
    created_at:string;
    deadline: null;
    description:string;
    file:string;
    id: number;
    title:string;
    updated_at:string;
    user: userType;
};
