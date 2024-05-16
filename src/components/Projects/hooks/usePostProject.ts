import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiPostProjectsInputType,
    apiPostProjects,
} from "api/projects/apiPostProjects";

export const usePostProjects = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["Projects", "post"],
        mutationFn: async (data: apiPostProjectsInputType) =>
            apiPostProjects(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
