import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiGetMessageReplies } from "src/api/messages/message-replies/apiGetMessageReplies";

export const useGetMessageReplies = (messageId: number) => {
    const [page, setPage] = useState(0);
    return {
        page,
        setPage,
        ...useQuery({
            queryKey: ["messageReply", messageId, page],
            queryFn: async () =>
                apiGetMessageReplies({ message: messageId, page: page + 1 }),
        }),
    };
};
