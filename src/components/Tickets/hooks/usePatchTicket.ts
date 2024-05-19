import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPatchTickets, apiPatchTicketsInputType } from "api/tickets/apiPatchTickets";

export const usePatchTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["tickets", "patch"],
        mutationFn: async (data: apiPatchTicketsInputType) =>
            apiPatchTickets(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
    });
};
