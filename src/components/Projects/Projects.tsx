import { useQuery } from "@tanstack/react-query";
import Loader from "components/ui/Loader";
import { useState } from "react";
import ProjectsUi from "./ProjectsUi";
import { apiGetProjects } from "api/projects/apiGetProjects";
import { customError } from "src/types/customError";
import ErrorPage from "../ui/ErrorPage";

//Projects page component
const Projects = () => {
    const [page, setpage] = useState(1); //todo pagination
    const { data, error, isLoading } = useQuery({
        queryKey: ["Projects", page],
        queryFn: () => apiGetProjects({ page: page }),
    });
    if (isLoading)
        return (
            <Loader size={100} className=" text-primary dark:text-dprimary " />
        );
    if (error) return <ErrorPage error={error as customError}/>; //todo
    return data && <ProjectsUi data={data.data.data[0]} />;
};

export default Projects;
