import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteMessage } from "src/api/messages/apiDeleteMessage";
import { deleteMessageType } from "src/types/messages/deleteMessageType";

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["Messages", "delete"],
        mutationFn: async (data: deleteMessageType) => apiDeleteMessage(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Messages"] });
        },
    });
};
