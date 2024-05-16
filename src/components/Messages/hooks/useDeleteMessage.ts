import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiDeleteMessages,
    apiDeleteMessagesInputType,
} from "src/api/messages/apiDeleteMessages";

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["messages", "delete"],
        mutationFn: async (data: apiDeleteMessagesInputType) =>
            apiDeleteMessages(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
    });
};
