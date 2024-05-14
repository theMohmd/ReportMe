import { apiGetUserSupervisor } from "api/projects/apiGetUserSupervisor";
import { useAuth } from "contexts/Auth/useAuth";
import { userType } from "types/auth";
type data = {
    created_at: string;
    id: number;
    supervisor: userType;
    updated_at: string;
    user: userType;
};

//a hook that return a function which utelizes api to return list of supervisor
export const useGetSupervisors = () => {
    const { user } = useAuth();
    return () =>
        apiGetUserSupervisor("", "").then((res) => {
            return res.data.data[0].data
                .filter((item: data) => {
                    return item.user.id === user?.id;
                })
                .map((item: data) => {
                    return { USid: item.id, ...item.supervisor };
                });
        });
};
