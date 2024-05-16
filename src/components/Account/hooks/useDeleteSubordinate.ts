import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteUserSupervisors, apiDeleteUserSupervisorsInputType } from "api/user-supervisors/apiDeleteUserSupervisors";

export const useDeleteSubordinate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["user-subordinate", "delete"],
        mutationFn: async (data: apiDeleteUserSupervisorsInputType) =>
            apiDeleteUserSupervisors(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-subordinate"] });
        },
    });
};
