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

    //todo delete user
    return (
        <div className="px-5 rounded-xl border text-primary bg-background border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
            {data && data.length ? (
                data.map((item: { id: number; user: userType },index:number) => (
                    <div key={item.user.id} className="flex flex-col">
                        <p className=" py-2 ">
                            {item.user.name}
                            <span className="px-2 text-lightBorder dark:text-dlightBorder">
                                |
                            </span>
                            {item.user.email}
                        </p>

                        {
                            index < data.length-1 &&
                            <span
                                className="border-b border-lightBorder dark:border-dlightBorder"
                            ></span>
                        }
                    </div>
                ))
            ) : (
                <p className=" py-2 dark:border-dlightBorder">
                    {t("Projects.noUsers")}
                </p>
            )}
        </div>
    );
};

export default ProjectUsers;
