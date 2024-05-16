import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteUserSupervisors, apiDeleteUserSupervisorsInputType } from "api/user-supervisors/apiDeleteUserSupervisors";

export const useDeleteSupervisor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["user-supervisors", "delete"],
        mutationFn: async (data: apiDeleteUserSupervisorsInputType) =>
            apiDeleteUserSupervisors(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-supervisors"] });
        },
    });
};
