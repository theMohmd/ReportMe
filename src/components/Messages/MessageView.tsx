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
    if (isLoading)
        return (
            <Loader size={100} className="text-primary dark:text-dprimary" />
        );
    if (error) return <ErrorPage error={error as customError} />;
    console.log(data)
    return (
        <>
            {data && (
                <div className="flex flex-col gap-2 grow">
                    <div className="flex justify-between items-center mb-5">
                        <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
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
                    <div className="flex flex-col gap-2 p-5 rounded-xl border text-primary bg-background grow border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
                        <div className="flex gap-1 items-center pb-2 text-lg font-medium border-b border-lightBorder dark:border-dlightBorder">
                            <span>{data.sender.name}</span>
                            <span className="text-sm font-thin">
                                ({data.sender.email})
                            </span>
                            <span>{t("Messages.to")}</span>
                            <span>{data.receiver.name}</span>
                            <span className="text-sm font-thin">
                                ({data.receiver.email})
                            </span>
                            <span className="text-sm font-thin ms-auto">
                                {dateFormat(data.updated_at)}
                            </span>
                        </div>
                        <p className="overflow-auto h-0 grow">{data.content}</p>
                    </div>
                    {data.file !== "/storage/" && (
                        <div className="flex flex-col gap-2 p-5 rounded-xl border text-primary bg-background grow border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
                        <a href={"http://127.0.0.1:8000/download"+data.file} download="name">file</a>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MessageView;
