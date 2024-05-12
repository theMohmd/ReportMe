import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetProjects } from "api/projects/apiGetProjects";
import CustomButton from "components/ui/CustomButton";
import Loader from "components/ui/Loader";

//ProjectView component
const ProjectView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, isLoading } = useQuery({
        queryKey: ["messages", id],
        queryFn: () => apiGetProjects({ id: id ? parseInt(id) : undefined }),
    });
    return (
        <div className="flex flex-col gap-2 p-5 pt-10 size-full">
            {isLoading && <Loader size={100} className="text-primary" />}
            {/* //todo */}
            {error && <p>error</p>}
            {data && (
                <>
                    <div className="flex justify-between items-center px-2 mb-5">
                        <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                            {data.data.data.title}
                        </p>
                        <div className=" flex gap-2">
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
                    <div className=" bg-background dark:bg-dbackground grow p-5 rounded-xl border border-lightBorder dark:border-dlightBorder ">
                        {data.data.data.description}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProjectView;
