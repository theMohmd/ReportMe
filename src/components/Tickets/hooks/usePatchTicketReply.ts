import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiPatchTicketReplies,
    apiPatchTicketRepliesInputType,
} from "src/api/tickets/ticket-replies/apiPatchTicketReplies";

export const usePatchTicketReply = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["tickets", "patch"],
        mutationFn: async (data: apiPatchTicketRepliesInputType) =>
            apiPatchTicketReplies(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ticketReply"] });
        },
    });
};
