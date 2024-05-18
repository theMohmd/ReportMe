import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPatchMessages, apiPatchMessagesInputType } from "api/messages/apiPatchMessages";

export const usePatchMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["messages", "patch"],
        mutationFn: async (data: apiPatchMessagesInputType) =>
            apiPatchMessages(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
    });
};
