import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { customError } from "types/customError";
import { useParams } from "react-router-dom";
import { apiGetWarnings } from "api/warnings/apiGetWarnings";
import { apiGetUserProjectsId } from "api/user-projects/apiGetUserProjectsId";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import WarningsPerProjectUi from "./WarningsPerProjectUi";

//WarningsPerProject component
const WarningsPerProject = () => {
    const { user_project_id } = useParams();
    const [page, setpage] = useState(0);
    const { data, error, isLoading } = useQuery({
        queryKey: ["user-projects", "projects", user_project_id, page],
        queryFn: async () => {
            const user_project = await apiGetUserProjectsId({
                id: user_project_id ? parseInt(user_project_id) : -1,
            });
            const warnings = await apiGetWarnings({
                page: page + 1,
            });
            return {
                warnings: warnings,
                user_project: user_project,
            };
        },
    });
    if (isLoading) return <Loader size={100} />;
    if (error) return <ErrorPage error={error as customError} />;

    return (
        data && (
            <WarningsPerProjectUi
                setPage={(input: number) => setpage(input)}
                page={page}
                warnings={data.warnings}
                user_project={data.user_project}
            />
        )
    );
};

export default WarningsPerProject;
