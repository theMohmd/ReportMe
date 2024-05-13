import { useQuery } from "@tanstack/react-query";
import {
    ChevronLeftIcon,
    PlusIcon,
    SquarePenIcon,
    Trash2Icon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetProjects } from "api/projects/apiGetProjects";
import CustomButton from "components/ui/CustomButton";
import Loader from "components/ui/Loader";
import ErrorPage from "../ui/ErrorPage";
import { customError } from "src/types/customError";
import UserSelect from "../Common/UserSelect/UserSelect";
import { t } from "i18next";
import { useGetSubusers } from "./hooks/useGetSubusers";

//ProjectView component
const ProjectView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const query = useGetSubusers();
    const { data, error, isLoading } = useQuery({
        queryKey: ["projects", id],
        queryFn: () => apiGetProjects({ id: id ? parseInt(id) : undefined }),
    });

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
                            <CustomButton onClick={() => navigate(-1)}>
                                <Trash2Icon size={30} />
                            </CustomButton>
                            <CustomButton onClick={() => navigate(-1)}>
                                <ChevronLeftIcon size={30} />
                            </CustomButton>
                        </div>
                    </div>
                    <div className="flex ">
                        <div className="flex grow flex-col gap-2 justify-center items-start md:flex-row md:items-center">
                            <p className="font-medium ps-2">
                                {t("Projects.assign")}
                            </p>
                            <div className="flex grow gap-2 md:w-fit w-full">
                                <UserSelect
                                    queryKey="getSubUsers"
                                    query={query}
                                    set={(i) => console.log(i)}
                                />
                                <CustomButton onClick={() => undefined}>
                                    <PlusIcon />
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 rounded-xl border text-primary bg-background grow border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
                        {data.data.data.description}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectView;
