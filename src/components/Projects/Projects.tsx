import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { apiGetProjects } from "api/projects/apiGetProjects";
import { customError } from "types/customError";

import Loader from "components/ui/Loader";
import ProjectsUi from "./ProjectsUi";
import ErrorPage from "components/ui/ErrorPage";

//Projects page component
const Projects = () => {
    const [page, setpage] = useState(0);
    const { data, error, isLoading } = useQuery({
        queryKey: ["projects", page],
        queryFn: () => apiGetProjects({ page: page + 1 }),
    });
    if (isLoading) return <Loader size={100} />;
    if (error) return <ErrorPage error={error as customError} />;
    return (
        data && (
            <ProjectsUi
                setPage={(input: number) => setpage(input)}
                page={page}
                data={data}
            />
        )
    );
};

export default Projects;
