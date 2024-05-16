import { useQuery } from "@tanstack/react-query";

import { apiGetAuth, apiGetAuthOutputType } from "api/auth/apiGetUser";
import { useAuth } from "contexts/Auth/useAuth";

export const useQueryGetUser = () => {
    const { setUser } = useAuth();
    return useQuery({
        queryFn: async () => {
            try {
                await apiGetAuth().then((res:apiGetAuthOutputType) => {
                    setUser(res);
                });
                return "ready";
            } catch (err) {
                return "noUser";
            }
        },
        retry: 1,
        queryKey: ["getUser"],
        refetchIntervalInBackground: false,
    });
};
