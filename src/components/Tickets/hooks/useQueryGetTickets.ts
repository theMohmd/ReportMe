import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiGetTickets } from "src/api/tickets/apiGetTickets";

export const useQueryGetTickets = () => {
    const [page, setpage] = useState(0);
    return {
        setpage: setpage,
        page: page,
        ...useQuery({
            queryKey: ["tickets", page],
            queryFn: () => apiGetTickets({ page: page + 1 }),
        }),
    };
};
