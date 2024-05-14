import { useQuery } from "@tanstack/react-query";
import { apiGetProjectsUser } from "src/api/projects/apiGetProjectUser";
import Loader from "../ui/Loader";
import ErrorPage from "../ui/ErrorPage";
import { customError } from "src/types/customError";

//ProjectUsers component
type ProjectUsersProps = { id: number };
const ProjectUsers = ({ id }: ProjectUsersProps) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["projectUsers", id],
        queryFn: () => apiGetProjectsUser({ id: id }),
    });
    if (isLoading) <Loader />;
    if (error) <ErrorPage error={error as customError} />;
    console.log(data)//todo
    return (
        <div className="p-5 rounded-xl border text-primary bg-background border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
            ProjectUsers
        </div>
    );
};

export default ProjectUsers;
