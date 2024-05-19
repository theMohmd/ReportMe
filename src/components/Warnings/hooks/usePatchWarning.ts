import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPatchWarnings, apiPatchWarningsInputType } from "api/warnings/apiPatchWarnings";

export const usePatchWarning = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["warnings", "patch"],
        mutationFn: async (data: apiPatchWarningsInputType) =>
            apiPatchWarnings(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["warnings"] });
        },
    });
};
