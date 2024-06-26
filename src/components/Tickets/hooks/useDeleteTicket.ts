import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiDeleteTickets,
    apiDeleteTicketsInputType,
} from "src/api/tickets/apiDeleteTickets";

export const useDeleteTicket = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["tickets", "delete"],
        mutationFn: async (data: apiDeleteTicketsInputType) =>
            apiDeleteTickets(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
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
