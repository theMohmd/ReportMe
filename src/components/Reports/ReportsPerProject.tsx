import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { customError } from "types/customError";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import ReportsPerProjectUi from "./ReportsPerProjectUi";
import { useParams } from "react-router-dom";
import { apiGetReports } from "src/api/reports/apiGetReports";

//ReportsPerProject component
const ReportsPerProject = () => {
    const { id } = useParams();
    const [page, setpage] = useState(0);
    const { data, error, isLoading } = useQuery({
        queryKey: ["Reports", "Projects", id, page],
        queryFn: () => apiGetReports({ page: page + 1}),
    });
    if (isLoading)
        return (
            <Loader size={100} className="text-primary dark:text-dprimary" />
        );
    if (error) return <ErrorPage error={error as customError} />; //todo

    return (
        data && (
            <ReportsPerProjectUi
                setPage={(input: number) => setpage(input)}
                page={page}
                data={data.data[0]}
            />
        )
    );
};

export default ReportsPerProject;
