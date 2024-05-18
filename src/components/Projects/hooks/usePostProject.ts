import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiPostProjectsInputType,
    apiPostProjects,
} from "api/projects/apiPostProjects";

export const usePostProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["projects", "post"],
        mutationFn: async (data: apiPostProjectsInputType) =>
            apiPostProjects(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
