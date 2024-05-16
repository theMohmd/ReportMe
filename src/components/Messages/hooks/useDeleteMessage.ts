import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteMessageInputType, apiDeleteMessages } from "src/api/messages/apiDeleteMessage";

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["Messages", "delete"],
        mutationFn: async (data: apiDeleteMessageInputType) => apiDeleteMessages(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
    });
};
