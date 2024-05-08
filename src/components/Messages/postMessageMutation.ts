import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostMessage } from "src/api/apiPostMessage";
import { postMessageType } from "src/types/postMessageType";

export const usePostMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["messages"],
        mutationFn: async (data: postMessageType) => apiPostMessage(data),
        onSuccess: (data) => {
            console.log("Mutation succeeded", data);
            queryClient.invalidateQueries({ queryKey: ["Messeges"] });

            close();
        },
        onError: (error) => {
            console.error("Mutation failed", error);
        },
    });
};
