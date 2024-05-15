import { t } from "i18next";
import { useQuery } from "@tanstack/react-query";
import { customError } from "types/customError";

import { apiGetUserProjects } from "api/user-projects/apiGetUserProjects";
import { userType } from "types/userType";

import Loader from "../ui/Loader";
import ErrorPage from "../ui/ErrorPage";

//ProjectUsers component
type ProjectUsersProps = { id: number };
const ProjectUsers = ({ id }: ProjectUsersProps) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["user-projects", id],
        queryFn: () =>
            apiGetUserProjects({ project: id }).then((res) => res.data[0].data),
    });
    if (isLoading) <Loader size={40} />;
    if (error) <ErrorPage error={error as customError} />;

console.log(data)
console.log(id)
    //todo delete user
    return (
        <div className="px-5 rounded-xl border text-primary bg-background border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
            {data && data.length ? (
                data.map((item: { id: number; user: userType }) => (
                    <p
                        className="relative py-2 border-b top-[1px] border-lightBorder dark:border-dlightBorder"
                        key={item.id}
                    >
                        {item.user.name}
                        <span className="px-2 text-lightBorder dark:text-dlightBorder">
                            |
                        </span>
                        {item.user.email}
                    </p>
                ))
            ) : (
                <p className="relative py-2 border-b top-[1px] border-lightBorder dark:border-dlightBorder">{t("Projects.noUsers")}</p>
            )}
        </div>
    );
};

export default ProjectUsers;
