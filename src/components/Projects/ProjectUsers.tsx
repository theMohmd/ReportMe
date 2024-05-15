import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader";
import ErrorPage from "../ui/ErrorPage";
import { customError } from "src/types/customError";
import { apiGetUserProjects } from "src/api/user-projects/apiGetUserProjects";
import { userType } from "src/types/auth";

//ProjectUsers component
type ProjectUsersProps = { id: number };
const ProjectUsers = ({ id }: ProjectUsersProps) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["user-projects", id],
        queryFn: () =>
            apiGetUserProjects({ project: id }).then((res) => res.data[0].data), //todo param?
    });
    if (isLoading) <Loader />;
    if (error) <ErrorPage error={error as customError} />;
    return (
        <div className="p-5 rounded-xl border text-primary bg-background border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
            {data.map((item:{user:userType}) => (
                <p>{item.user.name}</p>
            ))}
        </div>
    );
};

export default ProjectUsers;
