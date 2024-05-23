import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostTicketReplies, apiPostTicketRepliesInputType } from "src/api/tickets/ticket-replies/apiPostTicketReplies";

export const usePostReply = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["ticketReply"],
        mutationFn: async (data: apiPostTicketRepliesInputType) => apiPostTicketReplies(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ticketReply"] });
        },
    });
};
