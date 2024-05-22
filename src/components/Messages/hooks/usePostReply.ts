import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostMessageReplies, apiPostMessageRepliesInputType } from "src/api/messages/message-replies/apiPostMessageReplies";

export const usePostReply = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["messageReply"],
        mutationFn: async (data: apiPostMessageRepliesInputType) => apiPostMessageReplies(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messageReply"] });
        },
    });
};
