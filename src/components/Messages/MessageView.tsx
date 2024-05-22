import { t } from "i18next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useAuth } from "contexts/Auth/useAuth";
import { dateFormat } from "utils/dateFormat";
import { messageType } from "types/messageType";
import { customError } from "types/customError";
import { apiGetMessagesId } from "api/messages/apiGetMessagesId";
import { parentStaggerVariants, scaleVariants } from "utils/motionVariants";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import CustomButton from "components/ui/CustomButton";
import {
    ChevronLeftIcon,
    DownloadIcon,
    MessageSquareQuoteIcon,
    SquarePenIcon,
    Trash2Icon,
} from "lucide-react";
import EditMessageDialog from "./EditMessageDialog";
import { useDeleteMessage } from "./hooks/useDeleteMessage";
import MessageReplies from "./MessageReplies";

//MessageView component
const MessageView = () => {
    const [editDialog, setEditDialog] = useState(false);

    const { id } = useParams();
    const { user } = useAuth();
    const { data, error, isLoading } = useQuery<messageType>({
        queryKey: ["messages", id],
        queryFn: () => apiGetMessagesId({ id: id ? parseInt(id) : -1 }),
    });
    const navigate = useNavigate();
    const deleteAction = useDeleteMessage(() => navigate(-1));

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
                            <EditMessageDialog
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
                            <CustomButton>
                                <MessageSquareQuoteIcon />
                            </CustomButton>
                            {user?.id === data.sender.id && (
                                <>
                                    <CustomButton
                                        onClick={() => setEditDialog(true)}
                                    >
                                        <SquarePenIcon />
                                    </CustomButton>
                                    <CustomButton
                                        onClick={() =>
                                            deleteAction(data ? data.id : -1)
                                        }
                                    >
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
                        className="flex flex-col gap-2 p-5 rounded-xl border bg-background grow border-lightBorder dark:bg-dbackground dark:border-dlightBorder"
                    >
                        <div className="flex flex-col md:flex-row md:gap-1 items-start md:items-center pb-2 text-lg font-medium border-b border-lightBorder dark:border-dlightBorder">
                            {/******************************************************************************
                            sender
                            ******************************************************************************/}
                            <div className="flex items-center">
                                <span className="line-clamp-1 overflow-hidden text-ellipsis">
                                    {data.sender.name}
                                </span>
                                <span className="text-sm font-thin overflow-hidden text-ellipsis">
                                    ({data.sender.email})
                                </span>
                            </div>

                            <span>{t("Messages.to")}</span>

                            {/******************************************************************************
                            receiver
                            ******************************************************************************/}
                            <div className="flex items-center">
                                <span className="line-clamp-1 overflow-hidden text-ellipsis">
                                    {data.receiver.name}
                                </span>
                                <span className="text-sm font-thin overflow-hidden text-ellipsis">
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
                    replies
                    ******************************************************************************/}
                    <div className="flex justify-between items-end h-10">
                        <p className="px-2 text-xl font-semibold ">
                            {t("Messages.replies")}
                        </p>
                    </div>
                    <div className="flex rounded-xl flex-col max-h-[40%] overflow-x-hidden overflow-y-auto">
                        <MessageReplies messageId={data.id} />
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default MessageView;
