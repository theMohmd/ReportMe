import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAuthUpdate, apiAuthUpdateInputType } from "src/api/auth/apiAuthUpdate";
import { useAuth } from "src/contexts/Auth/useAuth";

export const usePatchAccount = () => {
    const queryClient = useQueryClient();
    const {setUser} = useAuth()
    return useMutation({
        mutationKey: ["auth", "patch"],
        mutationFn: async (data: apiAuthUpdateInputType) =>
            apiAuthUpdate(data),
        onSuccess: (res) => {
            setUser(res)
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });
};
