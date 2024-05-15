import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { customError } from "types/customError";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import ReportsPerProjectUi from "./ReportsPerProjectUi";
import { useParams } from "react-router-dom";
import { apiGetReports } from "src/api/reports/apiGetReports";
import { apiGetUserProjects } from "src/api/user-projects/apiGetUserProjects";

//ReportsPerProject component
const ReportsPerProject = () => {
    const { user_project_id } = useParams(); //user-project id
    const [page, setpage] = useState(0);
    const { data, error, isLoading } = useQuery({
        queryKey: ["Reports", "Projects", user_project_id, page],
        queryFn: async () => {
            const user_project = await apiGetUserProjects({
                id: user_project_id ? parseInt(user_project_id) : undefined,
            }).then((res) => res.data);
            console.log("id",user_project.project.id)
            const reports = await apiGetReports({
                page: page + 1,
                //project: user_project.project.id, //todo
            });
            console.log("reports",reports)
            return {
                data: reports,
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
                data={data.data.data[0]}
                user_project={data.user_project}
            />
        )
    );
};

export default ReportsPerProject;
