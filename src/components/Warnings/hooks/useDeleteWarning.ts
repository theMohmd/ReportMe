import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiDeleteWarnings,
    apiDeleteWarningsInputType,
} from "src/api/warnings/apiDeleteWarnings";

export const useDeleteWarning = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["warnings", "delete"],
        mutationFn: async (data: apiDeleteWarningsInputType) =>
            apiDeleteWarnings(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["warnings"] });
        },
    });
    return (id: number) => {
        mutate({ id: id });
    };
};
