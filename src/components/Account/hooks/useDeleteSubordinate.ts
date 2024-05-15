import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    deleteUserSupervisorType,
    apiDeleteUserSupervisor,
} from "api/user-supervisor/apiDeleteUserSupervisor";

export const useDeleteSubordinate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["user-subordinate", "delete"],
        mutationFn: async (data: deleteUserSupervisorType) =>
            apiDeleteUserSupervisor(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-subordinate"] });
        },
    });
};
