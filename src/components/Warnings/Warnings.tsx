import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { customError } from "types/customError";
import { apiGetUserProjects } from "api/user-projects/apiGetUserProjects";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import WarningsUi from "./WarningsUi";

//all project to warning
const Warnings = () => {
    const [page, setpage] = useState(0);
    const { data, error, isLoading } = useQuery({
        queryKey: ["user-projects", page],
        queryFn: () => apiGetUserProjects({ page: page + 1 }),
    });
    if (isLoading) return <Loader size={100} />;
    if (error) return <ErrorPage error={error as customError} />;
    return (
        data && (
            <WarningsUi
                setPage={(input: number) => setpage(input)}
                page={page}
                data={data}
            />
        )
    );
};

export default Warnings;
