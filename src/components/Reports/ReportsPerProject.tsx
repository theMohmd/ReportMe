import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { customError } from "types/customError";
import { useParams } from "react-router-dom";
import { apiGetReports } from "api/reports/apiGetReports";
import { apiGetUserProjectsId } from "api/user-projects/apiGetUserProjectsId";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import ReportsPerProjectUi from "./ReportsPerProjectUi";

//ReportsPerProject component
const ReportsPerProject = () => {
    const { user_project_id } = useParams();
    const [page, setpage] = useState(0);
    const { data, error, isLoading } = useQuery({
        //todo fix this sh
        queryKey: ["user-projects", "projects", user_project_id, page],
        queryFn: async () => {
            const user_project = await apiGetUserProjectsId({
                id: user_project_id ? parseInt(user_project_id) : -1,
            })
            const reports = await apiGetReports({
                page: page + 1,
                //project: user_project.project.id, //todo
            });
            return {
                reports: reports,
                user_project: user_project,
            };
        },
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
                reports={data.reports}
                user_project={data.user_project}
            />
        )
    );
};

export default ReportsPerProject;
