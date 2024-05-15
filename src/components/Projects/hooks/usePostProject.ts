import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProjectType,apiPostProject } from "src/api/projects/apiPostProject";

export const usePostProjects = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["Projects","post"],
        mutationFn: async (data: postProjectType) => apiPostProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Projects"] });
        },
    });
};
