import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostProject } from "src/api/projects/apiPostProject";
import { postProjectType } from "src/types/projects/postProjectType";

export const usePostProjects = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["Projects"],
        mutationFn: async (data: postProjectType) => apiPostProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Projects"] });
        },
    });
};
