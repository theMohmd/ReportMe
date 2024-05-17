import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "contexts/Auth/useAuth";
import { dateFormat } from "utils/dateFormat";
import { customError } from "types/customError";
import { apiGetReportsId } from "api/reports/apiGetReportsId";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import CustomButton from "components/ui/CustomButton";
import { ChevronLeftIcon, Trash2Icon } from "lucide-react";
import { scaleVariants } from "src/utils/motionVariants";

//ReportView component
const ReportView = () => {
    const { id } = useParams(); //report id
    const navigate = useNavigate();
    const { data, error, isLoading } = useQuery({
        queryKey: ["reports", id],
        queryFn: () => apiGetReportsId({ id: id ? parseInt(id) : -1 }),
    });
    const { user } = useAuth();
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
    console.log(data);
    return (
        <>
            {data && (
                <div className="flex flex-col gap-2 grow">
                    {/*top bar*/}
                    <div className="flex justify-between items-center mb-5">
                            <Link
                                to={`/projects/${data.project.id}`}
                                className="px-2 text-3xl line-clamp-1 font-semibold text-primary dark:text-dprimary"
                            >
                                {data.project.title}
                            </Link>
                        <div className="flex gap-2">
                            {user?.id === data.user.id && (
                                <CustomButton onClick={() => navigate(-1)}>
                                    <Trash2Icon />
                                </CustomButton>
                            )}
                            <CustomButton onClick={() => navigate(-1)}>
                                <ChevronLeftIcon />
                            </CustomButton>
                        </div>
                    </div>
                    {/*content*/}
                    <motion.div variants={scaleVariants} initial="initial" animate="animate" className="flex flex-col gap-2 p-5 rounded-xl border text-primary bg-background grow border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
                        <div className="flex gap-1 items-center pb-2 text-lg font-medium border-b border-lightBorder dark:border-dlightBorder">
                            <span>{data.user.name}</span>
                            <span className="text-sm font-thin">({data.user.email})</span>
                            <span className="text-sm font-thin ms-auto">{dateFormat(data.updated_at)}</span>
                        </div>
                        <p className="overflow-auto h-0 grow">{data.description}</p>
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default ReportView;
