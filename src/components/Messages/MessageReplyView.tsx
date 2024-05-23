import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGetMessageRepliesId } from "src/api/messages/message-replies/apiGetMessageRepliesId";
import Loader from "../ui/Loader";
import ErrorPage from "../ui/ErrorPage";
import { customError } from "src/types/customError";
import { AnimatePresence, motion } from "framer-motion";
import { parentStaggerVariants, scaleVariants } from "src/utils/motionVariants";
import { useState } from "react";
import CustomButton from "../ui/CustomButton";
import {
    ChevronLeftIcon,
    DownloadIcon,
    SquarePenIcon,
    Trash2Icon,
} from "lucide-react";
import { useAuth } from "src/contexts/Auth/useAuth";
import { t } from "i18next";
import { dateFormat } from "src/utils/dateFormat";
import { useDeleteMessageReply } from "./hooks/useDeleteMessageReply";
import EditReplyDialog from "./EditReplyDialog";

//MessageReplyView component
const MessageReplyView = () => {
    const [editDialog, setEditDialog] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { reply_id } = useParams();
    const deleteAction = useDeleteMessageReply(() => navigate(-1));
    const { data, isLoading, error } = useQuery({
        queryKey: ["messageReply", reply_id],
        queryFn: () =>
            apiGetMessageRepliesId({ message_reply: reply_id ? reply_id : "" }),
    });
    if (isLoading) return <Loader size={40} />;
    if (error) return <ErrorPage error={error as customError} />;
    return (
        data && (
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
                        <EditReplyDialog
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
                    <Link
                        to={`/messages/${data.message.id}`}
                        className="px-2 grow w-0 overflow-hidden line-clamp-1 text-3xl font-semibold "
                    >
                        <span>{t("Messages.replyto")} </span>
                        <span>{data.message.title}</span>
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
                                    download={data.message.title + "_file"}
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
                                {data.user.name}
                            </span>
                            <span className="text-sm font-thin overflow-hidden text-ellipsis">
                                ({data.user.email})
                            </span>
                        </div>

                        <span>{t("Messages.to")}</span>

                        {/******************************************************************************
                            receiver
                            ******************************************************************************/}
                        <div className="flex items-center">
                            <span className="line-clamp-1 overflow-hidden text-ellipsis">
                                {data.user.name}
                            </span>
                            <span className="text-sm font-thin overflow-hidden text-ellipsis">
                                ({data.user.email})
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
            </motion.div>
        )
    );
};

export default MessageReplyView;
