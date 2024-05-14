import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { customError } from "types/customError";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import { apiGetUserProjects } from "src/api/user-projects/apiGetUserProjects";
import { useState } from "react";
import { t } from "i18next";

//ReportView component
const ReportView = () => {
    const { id } = useParams();
    const [mode, setmode] = useState<"project" | "report">("project");
    const { data, error, isLoading } = useQuery({
        queryKey: ["Reports", id],
        queryFn: () =>
            apiGetUserProjects({ id: id ? parseInt(id) : undefined }),
    });
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
    return (
        <>
            {data && (
                <div className="flex flex-col gap-2 p-5 md:pt-10 size-full">
                    <div className="flex justify-between items-center px-2 mb-5">
                        <div className="flex flex-col md:flex-row">
                            <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                                {data.data.user.email} :
                            </p>
                            <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                                {data.data.project.title}
                            </p>
                        </div>
                    </div>
                    <div className="p-5 rounded-xl border text-primary bg-background grow border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
                        <div className="flex mb-5 gap-2 font-semibold">
                            <button
                                onClick={() => setmode("project")}
                                className={
                                    mode === "project"
                                        ? "opacity-100"
                                        : "opacity-50"
                                }
                            >
                                {t("Reports.project")}
                            </button>
                            <span>/</span>
                            <button
                                onClick={() => setmode("report")}
                                className={
                                    mode === "report"
                                        ? "opacity-100"
                                        : "opacity-50"
                                }
                            >
                                {t("Reports.report")}
                            </button>
                        </div>
                        {mode === "project" && (
                            <p> {data.data.project.description}</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ReportView;
