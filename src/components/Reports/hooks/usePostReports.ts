import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostReport, postReportType } from "src/api/reports/apiPostReports";

export const usePostReports = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["Reports","post"],
        mutationFn: async (data: postReportType) => apiPostReport(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
    });
};

