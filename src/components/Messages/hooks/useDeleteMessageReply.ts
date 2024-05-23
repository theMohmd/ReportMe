import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiDeleteMessageReplies,
    apiDeleteMessageRepliesInputType,
} from "src/api/messages/message-replies/apiDeleteMessageReplies";

export const useDeleteMessageReply = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["messages", "delete"],
        mutationFn: async (data: apiDeleteMessageRepliesInputType) =>
            apiDeleteMessageReplies(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messageReply"] });
        },
    });
    return (id: number) => {
        mutate(
            { id: id },
            {
                onSuccess() {
                    if (onSuccessCallback) onSuccessCallback();
                },
            }
        );
    };
};
