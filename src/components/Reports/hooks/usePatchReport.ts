import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPatchReports, apiPatchReportsInputType } from "api/reports/apiPatchReports";

export const usePatchReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["reports", "patch"],
        mutationFn: async (data: apiPatchReportsInputType) =>
            apiPatchReports(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
    });
};
