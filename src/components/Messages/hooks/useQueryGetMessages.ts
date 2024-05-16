import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiGetMesseges } from "src/api/messages/apiGetMesseges";

export const useQueryGetMessages = () => {
    const [page, setpage] = useState(0);
    return {
        setpage: setpage,
        page: page,
        ...useQuery({
            queryKey: ["messages", page],
            queryFn: () => apiGetMesseges({ page: page + 1 }),
        }),
    };
};
