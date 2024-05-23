import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiPatchMessageReplies,
    apiPatchMessageRepliesInputType,
} from "src/api/messages/message-replies/apiPatchMessageReplies";

export const usePatchMessageReply = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["messages", "patch"],
        mutationFn: async (data: apiPatchMessageRepliesInputType) =>
            apiPatchMessageReplies(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messageReply"] });
        },
    });
};
