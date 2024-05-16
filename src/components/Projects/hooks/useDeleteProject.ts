import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteProject } from "src/api/projects/apiDeleteProject";
import { deleteProjectType } from "src/types/projects/deleteProjectType";

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["Projects", "delete"],
        mutationFn: async (data: deleteProjectType) => apiDeleteProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
