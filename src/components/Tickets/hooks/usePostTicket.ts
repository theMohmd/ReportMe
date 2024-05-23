import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostTickets, apiPostTicketsInputType } from "src/api/tickets/apiPostTickets";

export const usePostTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["tickets"],
        mutationFn: async (data: apiPostTicketsInputType) => apiPostTickets(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
    });
};
