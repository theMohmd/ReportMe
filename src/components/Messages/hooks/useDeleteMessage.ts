import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiDeleteMessages,
    apiDeleteMessagesInputType,
} from "src/api/messages/apiDeleteMessages";

export const useDeleteMessage = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["messages", "delete"],
        mutationFn: async (data: apiDeleteMessagesInputType) =>
            apiDeleteMessages(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
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
