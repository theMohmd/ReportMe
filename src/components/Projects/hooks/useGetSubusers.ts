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

export const useGetSubusers = async (input: string, mode: string) => {
    const { user } = useAuth();
    return apiGetUserSupervisor(input, mode).then((res) =>
        res.data.data[0].data.map((item: data) => {
            if (item.supervisor.id === user?.id) return item.user;
        })
    );
};
