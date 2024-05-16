import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteProjects, apiDeleteProjectsInputType } from "src/api/projects/apiDeleteProjects";

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["projects", "delete"],
        mutationFn: async (data: apiDeleteProjectsInputType) => apiDeleteProjects(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
