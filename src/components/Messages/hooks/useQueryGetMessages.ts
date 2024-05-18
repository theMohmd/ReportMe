import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiGetMessages } from "src/api/messages/apiGetMessages";

export const useQueryGetMessages = () => {
    const [page, setpage] = useState(0);
    return {
        setpage: setpage,
        page: page,
        ...useQuery({
            queryKey: ["messages", page],
            queryFn: () => apiGetMessages({ page: page + 1 }),
        }),
    };
};
