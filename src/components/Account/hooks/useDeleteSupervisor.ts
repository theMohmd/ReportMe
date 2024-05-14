import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteUserSupervisor } from "src/api/user-supervisor/apiDeleteUserSupervisor";
import { deleteUserSupervisorType } from "src/types/deleteUserSupervisorType";

export const useDeleteSupervisor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["user-supervisor", "delete"],
        mutationFn: async (data: deleteUserSupervisorType) => apiDeleteUserSupervisor(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-supervisor"] });
        },
    });
};
