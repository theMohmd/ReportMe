import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiDeleteUserProjects,
    apiDeleteUserProjectsInputType,
} from "src/api/user-projects/apiDeleteUserProjects";

export const useDeleteUserProjects = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["user-projects", "delete"],
        mutationFn: async (data: apiDeleteUserProjectsInputType) =>
            apiDeleteUserProjects(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-projects"] });
        },
    });
};
