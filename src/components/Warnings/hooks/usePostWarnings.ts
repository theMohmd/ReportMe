import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostWarnings, apiPostWarningsInputType } from "api/warnings/apiPostWarnings";

export const usePostWarnings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["warnings","post"],
        mutationFn: async (data: apiPostWarningsInputType) => apiPostWarnings(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["warnings"] });
        },
    });
};

