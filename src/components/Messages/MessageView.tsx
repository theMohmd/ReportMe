import { t } from "i18next";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { dateFormat } from "utils/dateFormat";
import { messageType } from "types/messageType";
import { customError } from "types/customError";
import { useDeleteProject } from "components/Projects/hooks/useDeleteProject";
import { apiGetMessegesId } from "api/messages/apiGetMessagesId";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import CustomButton from "components/ui/CustomButton";
import { ChevronLeftIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import { motion } from "framer-motion";
import { parentStaggerVariants, scaleVariants } from "src/utils/motionVariants";

//MessageView component
const MessageView = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useQuery<messageType>({
        queryKey: ["messages", id],
        queryFn: () => apiGetMessegesId({ id: id ? parseInt(id) : -1 }),
    });
    const { mutate: deleteRequest } = useDeleteProject();
    const navigate = useNavigate();
    const deleteAction = () => {
        deleteRequest(
            { id: data ? data.id : -1 },
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
    if (isLoading) return <Loader size={100} />;
    if (error) return <ErrorPage error={error as customError} />;
    console.log(data);
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
                    top bar
                    ******************************************************************************/}
                    <div className="flex justify-between items-center mb-5">
                        <p className="px-2 grow w-0 overflow-hidden line-clamp-1 text-3xl font-semibold ">
                            {data.title}
                        </p>
                        <div className="flex gap-1">
                            <CustomButton onClick={() => navigate(-1)}>
                                <SquarePenIcon />
                            </CustomButton>
                            <CustomButton onClick={deleteAction}>
                                <Trash2Icon />
                            </CustomButton>
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
                        className="flex flex-col gap-2 p-5 rounded-xl border bg-background grow border-lightBorder dark:bg-dbackground dark:border-dlightBorder"
                    >
                        <div className="flex flex-col md:flex-row md:gap-1 items-start md:items-center pb-2 text-lg font-medium border-b border-lightBorder dark:border-dlightBorder">
                            {/******************************************************************************
                            name
                            ******************************************************************************/}
                            <div className="flex items-center">
                                <span className="max-w-40 overflow-hidden text-ellipsis">
                                    {data.sender.name}
                                </span>
                                <span className="text-sm font-thin max-w-40 overflow-hidden text-ellipsis">
                                    ({data.sender.email})
                                </span>
                            </div>

                            <span>{t("Messages.to")}</span>

                            {/******************************************************************************
                            email
                            ******************************************************************************/}
                            <div className="flex items-center">
                                <span>{data.receiver.name}</span>
                                <span className="text-sm font-thin max-w-40 overflow-hidden text-ellipsis">
                                    ({data.receiver.email})
                                </span>
                            </div>

                            {/******************************************************************************
                            date
                            ******************************************************************************/}
                            <span className="line-clamp-1 w-40 text-end text-sm font-thin ms-auto">
                                {dateFormat(data.updated_at)}
                            </span>
                        </div>

                        {/******************************************************************************
                        message content
                        ******************************************************************************/}
                        <p className="overflow-auto h-0 grow">{data.content}</p>
                    </motion.div>
                    {/******************************************************************************
                    file if exists
                    ******************************************************************************/}
                    {data.file !== "/storage/" && (
                        <motion.div
                            variants={scaleVariants}
                            className="flex flex-col gap-2 p-5 rounded-xl border bg-background grow border-lightBorder dark:bg-dbackground dark:border-dlightBorder"
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

export default MessageView;
