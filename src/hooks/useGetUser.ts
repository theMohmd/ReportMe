import { apiGetUser } from "api/apiGetUser";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "contexts/Auth/useAuth";
export const useGetUser = () => {
    const { setUser } = useAuth();
    return useQuery({
        queryFn: async () => {
            try {
                await apiGetUser().then((res) => {
                    setUser({
                        email: res.data.user.email,
                        name: res.data.user.name,
                        id: res.data.user.id,
                    });
                });
                return "ready";
            } catch (err) {
                return "noUser"
            }
        },
        retry: 1,
        queryKey: ["getUser"],
        refetchIntervalInBackground: false,
    });
};
