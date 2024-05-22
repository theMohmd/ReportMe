import { useMutation } from "@tanstack/react-query";
import {
    apiPutReportsScore,
    apiPutReportsScoreInputType,
} from "src/api/reports/apiPutReportsScore";

export const useMutationScore = () => {
    return useMutation({
        mutationKey: ["score"],
        mutationFn: async (data: apiPutReportsScoreInputType) =>
            apiPutReportsScore(data),
    });
};
