import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { customError } from "types/customError";
import { useDeleteProject } from "./hooks/useDeleteProject";
import { useAuth } from "contexts/Auth/useAuth";
import { apiGetProjectsId } from "api/projects/apiGetProjectsId";

import CustomButton from "components/ui/CustomButton";
import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import AssignProject from "./AssignProject";
import ProjectUsers from "./ProjectUsers";
import { ChevronLeftIcon, SquarePenIcon, Trash2Icon } from "lucide-react";

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
                <div className="flex flex-col gap-2 grow">
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex">
                            <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
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
                    {user?.id === data.user.id && (
                        <>
                            <AssignProject id={data.id} />
                            <ProjectUsers id={data.id} />
                        </>
                    )}
                    <div className="p-5 rounded-xl border text-primary bg-background grow border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
                        {data.description}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectView;
