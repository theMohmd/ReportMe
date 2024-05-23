import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiDeleteTicketReplies,
    apiDeleteTicketRepliesInputType,
} from "src/api/tickets/ticket-replies/apiDeleteTicketReplies";

export const useDeleteTicketReply = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["tickets", "delete"],
        mutationFn: async (data: apiDeleteTicketRepliesInputType) =>
            apiDeleteTicketReplies(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ticketReply"] });
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
