import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiPostMessage,
    apiPostMessageInputType,
} from "api/messages/apiPostMessages";

export const usePostMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["messages"],
        mutationFn: async (data: apiPostMessageInputType) => apiPostMessage(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
    });
};
