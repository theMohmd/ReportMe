import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { apiGetMesseges } from "api/messages/apiGetMesseges";
import { customError } from "types/customError";
import { useDeleteProject } from "components/Projects/hooks/useDeleteProject";

import CustomButton from "components/ui/CustomButton";
import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import { ChevronLeftIcon, SquarePenIcon, Trash2Icon } from "lucide-react";

//MessageView component
const MessageView = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useQuery({
        queryKey: ["messages", id],
        queryFn: () => apiGetMesseges({ id: id ? parseInt(id) : undefined }),
    });
    const { mutate: deleteRequest } = useDeleteProject();
    const navigate = useNavigate();
    const deleteAction = () => {
        deleteRequest(
            { id: data?.data.id },
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
                <div className="flex flex-col gap-2 p-5 pt-10 size-full">
                    <div className="flex justify-between items-center px-2 mb-5">
                        <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                            {data.data.data.title}
                        </p>
                        <div className="flex gap-2">
                            <CustomButton onClick={() => navigate(-1)}>
                                <SquarePenIcon size={30} />
                            </CustomButton>
                            <CustomButton onClick={deleteAction}>
                                <Trash2Icon size={30} />
                            </CustomButton>
                            <CustomButton onClick={() => navigate(-1)}>
                                <ChevronLeftIcon size={30} />
                            </CustomButton>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-5 rounded-xl border text-primary bg-background grow border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
                        <p className="py-2 text-lg font-medium border-b border-lightBorder dark:border-dlightBorder">
                            {data.data.data.sender.email}
                        </p>
                        <p className="overflow-auto grow h-0">{data.data.data.content}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default MessageView;
