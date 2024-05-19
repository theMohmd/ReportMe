import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiPostTicketsInputType,
    apiPostTickets,
} from "api/tickets/apiPostTickets";

export const usePostTickets = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["Tickets", "post"],
        mutationFn: async (data: apiPostTicketsInputType) =>
            apiPostTickets(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Tickets"] });
        },
    });
};
