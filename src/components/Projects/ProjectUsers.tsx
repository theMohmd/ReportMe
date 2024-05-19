import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { customError } from "types/customError";

import { apiGetUserProjects } from "api/user-projects/apiGetUserProjects";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import { scaleVariants } from "src/utils/motionVariants";
import UserListUi from "../Account/UserListUi";
import { userProjectType } from "src/types/userProjectType";
import { useState } from "react";
import { useDeleteUserProjects } from "./hooks/useDeleteUserProjects";
import { t } from "i18next";

//ProjectUsers component
type ProjectUsersProps = { id: number };
const ProjectUsers = ({ id }: ProjectUsersProps) => {
    const [page, setpage] = useState(0);
    const { data, error, isLoading } = useQuery({
        queryKey: ["user-projects", id],
        queryFn: () =>
            apiGetUserProjects({ project_id: id }).then((res) => {
                return {
                    total: res.total,
                    data: res.data.map((item: userProjectType) => {
                        return { deleteId: item.id, ...item.user };
                    }),
                };
            }),
    });
    if (isLoading) <Loader size={40} />;
    if (error) <ErrorPage error={error as customError} />;
    const { mutate: deleteRequest } = useDeleteUserProjects();
    const deleteAction = (id: number) => {
        deleteRequest(
            { id: id },
            {
                onError() {
                    console.log("error");
                },
            }
        );
    };

    return (
        <motion.div
            variants={scaleVariants}
            className="px-5 rounded-xl border bg-background border-lightBorder dark:bg-dbackground dark:border-dlightBorder"
        >
            {data && (
                <UserListUi
                emptyMessage={t("Projects.noUsers")}
                    deleteAction={deleteAction}
                    page={page}
                    setPage={setpage}
                    data={data}
                />
            )}
        </motion.div>
    );
};

export default ProjectUsers;
