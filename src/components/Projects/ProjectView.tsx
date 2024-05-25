import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, DownloadIcon, SquarePenIcon, Trash2Icon } from "lucide-react";

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
import EditProjectDialog from "./EditProjectDialog";
import { useState } from "react";
import { t } from "i18next";
import { useConfirm } from "../Common/ConfirmModal/useConfirm";

//ProjectView component
const ProjectView = () => {
    const [editDialog, setEditDialog] = useState(false);
    const { user } = useAuth();
    const { id } = useParams();
    const {confirmModal} = useConfirm();
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
            }
        );
    };
    if (isLoading) return <Loader size={100} />;
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
                    {/******************************************************************************
                    edit dialog
                    ******************************************************************************/}
                    <AnimatePresence>
                        {editDialog && (
                            <EditProjectDialog
                                data={data}
                                close={() => {
                                    setEditDialog(false);
                                }}
                            />
                        )}
                    </AnimatePresence>
                    {/******************************************************************************
                    top bar
                    ******************************************************************************/}
                    <div className="flex gap-2 justify-between items-center mb-5">
                        <p className="px-2 grow w-0 overflow-hidden line-clamp-1 text-3xl font-semibold ">
                            {data.title}
                        </p>
                        <div className="flex gap-1">
                            {/******************************************************************************
                            file download button if exists
                            ******************************************************************************/}
                            {data.file && (
                                <CustomButton>
                                    <a
                                        href={
                                            "http://127.0.0.1:8000" + //todo make it variable
                                            data.file
                                        }
                                        target="_blank"
                                        download={data.title + "_file"}
                                    >
                                        <DownloadIcon />
                                    </a>
                                </CustomButton>
                            )}

                            {user?.id === data.user.id && (
                                <>
                                    <CustomButton
                                        onClick={() => setEditDialog(true)}
                                    >
                                        <SquarePenIcon />
                                    </CustomButton>
                                    <CustomButton onClick={()=>confirmModal(deleteAction)}>
                                        <Trash2Icon />
                                    </CustomButton>
                                </>
                            )}
                            <CustomButton onClick={() => navigate(-1)}>
                                <ChevronLeftIcon />
                            </CustomButton>
                        </div>
                    </div>
                    {/******************************************************************************
                    assigne user
                    ******************************************************************************/}
                    {user?.id === data.user.id && (
                        <>
                            <AssignProject id={data.id} />
                            <ProjectUsers id={data.id} />
                        </>
                    )}
                    {/******************************************************************************
                    content
                    ******************************************************************************/}
                    <motion.div
                        variants={scaleVariants}
                        className="flex flex-col gap-2 p-5 rounded-xl border bg-background grow border-lightBorder dark:bg-dbackground dark:border-dlightBorder"
                    >
                        <div className="flex gap-1 items-center pb-2 text-lg font-medium border-b border-lightBorder dark:border-dlightBorder">
                            {/******************************************************************************
                            name
                            ******************************************************************************/}
                            <div className="flex items-center">
                                <span className="max-w-40 overflow-hidden text-ellipsis">
                                    {data.user.name}
                                </span>
                                <span className="text-sm font-thin w-30 overflow-hidden text-ellipsis">
                                    ({data.user.email})
                                </span>
                            </div>

                            {/******************************************************************************
                            date
                            ******************************************************************************/}
                            <span className="line-clamp-1 w-30 shrink-0 text-end text-sm font-thin ms-auto">
                                {dateFormat(data.updated_at)}
                            </span>
                        </div>
                        {/******************************************************************************
                        deadline
                        ******************************************************************************/}
                        {!!data.deadline &&
                        <div className="flex flex-col md:flex-row md:gap-1 items-start md:items-center pb-2 font-medium border-b border-lightBorder dark:border-dlightBorder">
                                <span className="line-clamp-1 overflow-hidden text-ellipsis">
                                {t("Projects.deadline")}
                                </span>
                                <span className="line-clamp-1 overflow-hidden text-ellipsis">
                                    {dateFormat(data.deadline)}
                                </span>
                        </div>
                        }

                        {/******************************************************************************
                        description
                        ******************************************************************************/}
                        <p className="overflow-auto h-0 grow">
                            {data.description}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default ProjectView;
