import { apiGetUserSupervisor } from "src/api/projects/apiGetUserSupervisor";
import { useAuth } from "src/contexts/Auth/useAuth";
import { userType } from "src/types/auth";
type data = {
    created_at: string;
    id: number;
    supervisor: userType;
    updated_at: string;
    user: userType;
};

//a hook that return a function with utelizes api to return list of subusers
export const useGetSubusers = () => {
    const { user } = useAuth();
    return (input: string, mode: string) =>
        apiGetUserSupervisor(input, mode).then((res) =>
            res.data.data[0].data
                .filter((item: data) => {
                    return item.supervisor.id === user?.id;
                })
                .map((item: data) => item.user)
        );
};
