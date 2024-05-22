import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiPutReportsScore,
    apiPutReportsScoreInputType,
} from "src/api/reports/apiPutReportsScore";

export const useMutationScore = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["score"],
        mutationFn: async (data: apiPutReportsScoreInputType) =>
            apiPutReportsScore(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
    });
};
