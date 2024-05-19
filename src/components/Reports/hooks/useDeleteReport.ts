import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    apiDeleteReports,
    apiDeleteReportsInputType,
} from "src/api/reports/apiDeleteReports";

export const useDeleteReport = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["reports", "delete"],
        mutationFn: async (data: apiDeleteReportsInputType) =>
            apiDeleteReports(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-projects"] });//todo check
        },
    });
    return (id: number) => {
        mutate({ id: id });
    };
};
