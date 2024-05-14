import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { apiGetProjects } from "api/projects/apiGetProjects";
import { customError } from "types/customError";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import ReportsUi from "./ReportsUi";

//Reports component
const Reports = () => {
    const [page, setpage] = useState(0);
    const { data, error, isLoading } = useQuery({
        queryKey: ["Projects", page],
        queryFn: () => apiGetProjects({ page: page + 1 }),
    });
    if (isLoading)
        return (
            <Loader size={100} className="text-primary dark:text-dprimary" />
        );
    if (error) return <ErrorPage error={error as customError} />; //todo
        console.log(data)
    return (
        data && (
            <ReportsUi
                setPage={(input: number) => setpage(input)}
                page={page}
                data={data.data[0]}
            />
        )
    );
};

export default Reports;
