import Loader from "../ui/Loader";
import ErrorPage from "../ui/ErrorPage";
import { customError } from "src/types/customError";
import { apiGetUserProjects } from "src/api/user-projects/apiGetUserProjects";
import { userType } from "src/types/auth";
import { useQuery } from "@tanstack/react-query";

//ProjectUsers component
type ProjectUsersProps = { id: number };
const ProjectUsers = ({ id }: ProjectUsersProps) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["user-projects", id],
        queryFn: () =>
            apiGetUserProjects({ project: id }).then((res) => res.data[0].data), //todo param?
    });
    if (isLoading) <Loader size={40} />;
    if (error) <ErrorPage error={error as customError} />;
    return (
        <div className="px-5 rounded-xl border text-primary bg-background border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
            {data &&
                data.map((item: { id: number; user: userType }) => (
                    <p
                        className="relative top-[1px] py-2 border-b border-lightBorder dark:border-dlightBorder"
                        key={item.id}
                    >
                                    {item.user.name}
                                    <span className="px-2 text-lightBorder dark:text-dlightBorder">
                                        |
                                    </span>
                                    {item.user.email}
                    </p>
                ))}
        </div>
    );
};

export default ProjectUsers;
