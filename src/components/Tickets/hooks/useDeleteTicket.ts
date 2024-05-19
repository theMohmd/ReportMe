import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteTickets, apiDeleteTicketsInputType } from "src/api/tickets/apiDeleteTickets";

export const useDeleteTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["tickets", "delete"],
        mutationFn: async (data: apiDeleteTicketsInputType) => apiDeleteTickets(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
    });
};
