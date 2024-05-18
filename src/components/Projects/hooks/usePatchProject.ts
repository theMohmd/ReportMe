import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPatchProjects, apiPatchProjectsInputType } from "api/projects/apiPatchProjects";

export const usePatchProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["projects", "patch"],
        mutationFn: async (data: apiPatchProjectsInputType) =>
            apiPatchProjects(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
