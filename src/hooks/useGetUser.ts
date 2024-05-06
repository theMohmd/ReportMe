import { apiGetUser } from "api/apiGetUser";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "src/contexts/Auth/useAuth";
export const useGetUser = () => {
    const { setUser } = useAuth();
    return useQuery({
        queryFn: async () => {
            await apiGetUser().then((res) => {
                setUser({
                    email: res.data.user.email,
                    name: res.data.user.name,
                    id: res.data.user.id,
                });
            });
            return "ready";
        },
        retry: 1,
        queryKey: ["getUser"],
        refetchIntervalInBackground: false,
    });
};
