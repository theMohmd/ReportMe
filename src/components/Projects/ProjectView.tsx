import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, SquarePenIcon, Trash2Icon } from "lucide-react";

import { useAuth } from "contexts/Auth/useAuth";
import { dateFormat } from "utils/dateFormat";
import { customError } from "types/customError";
import { useDeleteProject } from "./hooks/useDeleteProject";
import { apiGetProjectsId } from "api/projects/apiGetProjectsId";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import CustomButton from "components/ui/CustomButton";
import ProjectUsers from "./ProjectUsers";
import AssignProject from "./AssignProject";
import { parentStaggerVariants, scaleVariants } from "src/utils/motionVariants";

//ProjectView component
const ProjectView = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const { data, error, isLoading } = useQuery({
        queryKey: ["projects", id],
        queryFn: () => apiGetProjectsId({ id: id ? parseInt(id) : -1 }),
    });
    const { mutate: deleteRequest } = useDeleteProject();
    const navigate = useNavigate();
    const deleteAction = () => {
        if (!data) return;
        deleteRequest(
            { id: data.id },
            {
                onSuccess() {
                    navigate(-1);
                },
                onError() {
                    console.log("error");
                },
            }
        );
    };
    if (isLoading)
        return (
            <Loader size={100} className="text-primary dark:text-dprimary" />
        );
    if (error) return <ErrorPage error={error as customError} />;
    return (
        <>
            {data && (
                <motion.div
                    variants={parentStaggerVariants}
                    initial="initial"
                    animate="animate"
                    className="flex flex-col gap-2 grow"
                >
                    {/*top bar*/}
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex">
                            <p className="px-2 line-clamp-1 text-3xl font-semibold text-primary dark:text-dprimary">
                                {data.title}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            {user?.id === data.user.id && (
                                <>
                                    <CustomButton onClick={() => navigate(-1)}>
                                        <SquarePenIcon />
                                    </CustomButton>
                                    <CustomButton onClick={deleteAction}>
                                        <Trash2Icon />
                                    </CustomButton>
                                </>
                            )}
                            <CustomButton onClick={() => navigate(-1)}>
                                <ChevronLeftIcon />
                            </CustomButton>
                        </div>
                    </div>
                    {/*content*/}
                    {user?.id === data.user.id && (
                        <>
                            <AssignProject id={data.id} />
                            <ProjectUsers id={data.id} />
                        </>
                    )}
                    <motion.div
                        variants={scaleVariants}
                        className="flex flex-col gap-2 p-5 rounded-xl border text-primary bg-background grow border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder"
                    >
                        <div className="flex gap-1 items-center pb-2 text-lg font-medium border-b border-lightBorder dark:border-dlightBorder">
                            <span>{data.user.name}</span>
                            <span className="text-sm font-thin">
                                ({data.user.email})
                            </span>
                            <span className="text-sm font-thin ms-auto">
                                {dateFormat(data.updated_at)}
                            </span>
                        </div>
                        <p className="overflow-auto h-0 grow">
                            {data.description}
                        </p>
                    </motion.div>
                    {data.file !== "/storage/" && (
                        <motion.div
                            variants={scaleVariants}
                            className="flex flex-col gap-2 p-5 rounded-xl border text-primary bg-background grow border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder"
                        >
                            <a
                                href={
                                    "http://127.0.0.1:8000/download" + data.file
                                }
                                download="name"
                            >
                                file
                            </a>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </>
    );
};

export default ProjectView;
