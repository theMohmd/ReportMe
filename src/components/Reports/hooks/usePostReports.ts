import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostReports, apiPostReportsInputType } from "api/reports/apiPostReports";

export const usePostReports = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["reports","post"],
        mutationFn: async (data: apiPostReportsInputType) => apiPostReports(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
    });
};

