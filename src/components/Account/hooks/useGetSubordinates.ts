import { useAuth } from "contexts/Auth/useAuth";
import { apiGetUserSupervisor } from "api/projects/apiGetUserSupervisor";
import { userType } from "types/userType";

type data = {
    //todo
    id: number;
    supervisor: userType;
    user: userType;
    created_at: string;
    updated_at: string;
};

//a hook that return a function which utelizes api to return list of subordinate
export const useGetSubordinates = () => {
    const { user } = useAuth();
    return (input:string="", mode:string="") =>
        apiGetUserSupervisor(input,mode).then((res) => {
            return res.data.data[0].data
                .filter((item: data) => {
                    return item.supervisor.id === user?.id;
                })
                .map((item: data) => {
                    return { USid: item.id, ...item.user };
                });
        });
};
