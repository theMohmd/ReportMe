import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteProject, deleteProjectType } from "api/projects/apiDeleteProject";

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["projects", "delete"],
        mutationFn: async (data: deleteProjectType) => apiDeleteProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
