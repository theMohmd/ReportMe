import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "contexts/Auth/useAuth";
import { dateFormat } from "utils/dateFormat";
import { customError } from "types/customError";
import { apiGetWarningsId } from "api/warnings/apiGetWarningsId";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import CustomButton from "components/ui/CustomButton";
import { ChevronLeftIcon, DownloadIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import { parentStaggerVariants, scaleVariants } from "src/utils/motionVariants";
import { useState } from "react";
import EditWarningDialog from "./EditWarningDialog";

//WarningView component
const WarningView = () => {
    const [editDialog, setEditDialog] = useState(false);
    const { id } = useParams(); //warning id
    const navigate = useNavigate();
    const { data, error, isLoading } = useQuery({
        queryKey: ["warnings", id],
        queryFn: () => apiGetWarningsId({ id: id ? parseInt(id) : -1 }),
    });
    const { user } = useAuth();
    //todo delete
    // const { mutate: deleteRequest } = useDeleteWarning();
    // const navigate = useNavigate();
    // const deleteAction = () => {
    //     deleteRequest(
    //         { id: data.data.id },
    //         {
    //             onSuccess() {
    //                 navigate(-1);
    //             },
    //             onError() {
    //                 console.log("error");
    //             },
    //         }
    //     );
    // };
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
                            <EditWarningDialog
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
                    <div className="flex justify-between items-center mb-5">
                        {/******************************************************************************
                        link to project
                        ******************************************************************************/}
                        <Link
                            to={`/projects/${data.project.id}`}
                            className="px-2 text-3xl line-clamp-1 font-semibold "
                        >
                            {data.project.title}
                        </Link>
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
                                        download={
                                            data.project.title + "_warning_file"
                                        }
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
                                    <CustomButton onClick={() => navigate(-1)}>
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
                    content
                    ******************************************************************************/}
                    <motion.div
                        variants={scaleVariants}
                        initial="initial"
                        animate="animate"
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
                        <p className="overflow-auto h-0 grow">
                            {data.description}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default WarningView;
