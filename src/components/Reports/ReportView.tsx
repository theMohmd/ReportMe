import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import { customError } from "types/customError";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import CustomButton from "../ui/CustomButton";
import { ChevronLeftIcon, Trash2Icon } from "lucide-react";
import { apiGetReports } from "src/api/reports/apiGetReports";
import { useAuth } from "src/contexts/Auth/useAuth";

//ReportView component
const ReportView = () => {
    const { id } = useParams();//report id
    const navigate = useNavigate();
    const { data, error, isLoading } = useQuery({
        queryKey: ["Reports", id],
        queryFn: () =>
            apiGetReports({ id: id ? parseInt(id) : undefined }),//todo isnumber
    });
    const {user} = useAuth()
    //todo delete
    // const { mutate: deleteRequest } = useDeleteReport();
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
                        <div className="flex flex-col md:flex-row">
                            <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                                {data.data.project.user.email} :
                            </p>
                            <Link to={`/projects/${data.data.project.id}`} className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                                {data.data.project.title}
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            {user?.id === data.data.user.id &&

                            <CustomButton onClick={() => navigate(-1)}>
                                <Trash2Icon />
                            </CustomButton>
                            }
                            <CustomButton onClick={() => navigate(-1)}>
                                <ChevronLeftIcon />
                            </CustomButton>
                        </div>
                    </div>
                    <div className="p-5 rounded-xl border text-primary bg-background grow border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
                            <p> {data.data.description}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReportView;
