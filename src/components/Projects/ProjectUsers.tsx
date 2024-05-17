import { t } from "i18next";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { customError } from "types/customError";

import { userType } from "types/userType";
import { apiGetUserProjects } from "api/user-projects/apiGetUserProjects";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import { scaleVariants } from "src/utils/motionVariants";

//ProjectUsers component
type ProjectUsersProps = { id: number };
const ProjectUsers = ({ id }: ProjectUsersProps) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["user-projects", id],
        queryFn: () => apiGetUserProjects({ project_id: id }),
    });
    if (isLoading) <Loader size={40} />;
    if (error) <ErrorPage error={error as customError} />;

    //todo delete user
    return (
        <motion.div variants={scaleVariants} className="px-5 rounded-xl border bg-background border-lightBorder dark:bg-dbackground dark:border-dlightBorder">
            {data && data.data.length ? (
                data.data.map(
                    (item: { id: number; user: userType }, index: number) => (
                        <div key={item.user.id} className="flex flex-col">
                            <p className=" py-2 ">
                                {item.user.name}
                                <span className="px-2 text-lightBorder dark:text-dlightBorder">
                                    |
                                </span>
                                {item.user.email}
                            </p>

                            {index < data.data.length - 1 && (
                                <span className="border-b border-lightBorder dark:border-dlightBorder"></span>
                            )}
                        </div>
                    )
                )
            ) : (
                <p className=" py-2 dark:border-dlightBorder">
                    {t("Projects.noUsers")}
                </p>
            )}
        </motion.div>
    );
};

export default ProjectUsers;
