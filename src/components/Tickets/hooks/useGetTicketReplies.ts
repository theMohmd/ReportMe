import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiGetTicketReplies } from "src/api/tickets/ticket-replies/apiGetTicketReplies";

export const useGetTicketReplies = (ticketId: number) => {
    const [page, setPage] = useState(0);
    return {
        page,
        setPage,
        ...useQuery({
            queryKey: ["ticketReply", ticketId, page],
            queryFn: async () =>
                apiGetTicketReplies({ ticket: ticketId, page: page + 1 }),
        }),
    };
};
