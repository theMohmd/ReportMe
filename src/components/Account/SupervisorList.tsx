import { useQuery } from "@tanstack/react-query";

import { customError } from "types/customError";
import { useGetSupervisors } from "./hooks/useGetSupervisors";
import { userType } from "src/types/userType";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import { Trash2Icon } from "lucide-react";
import { useDeleteSupervisor } from "./hooks/useDeleteSupervisor";
import { t } from "i18next";
type data = userType & { USid: number };

//SupervisorList component
const SupervisorList = () => {
    const query = useGetSupervisors();
    const { data, isLoading, error } = useQuery({
        queryKey: ["user-supervisor"],
        queryFn: query,
    });
    const { mutate: deleteRequest } = useDeleteSupervisor();
    const deleteAction = (id: number) => {
        deleteRequest(
            { user_supervisor: id },
            {
                onError() {
                    console.log("error");
                },
            }
        );
    };
    if (isLoading)
        return <Loader size={40} className="text-primary dark:text-dprimary" />;
    if (error) return <ErrorPage error={error as customError} />;
    return (
        <div className="flex grow flex-col ">
            {data && data.length < 1 ? (
                <p className="flex gap-2 justify-between py-2 border-t border-lightBorder dark:border-dlightBorder">
                    {t("Account.noSupervisors")}
                </p>
            ) : (
                data.map((item: data, index: number) => (
                    <div key={item.USid} className="flex flex-col">
                        <div className="flex gap-2 justify-between py-2 ">
                            <p> {item.name} </p>
                            <span className="px-2 text-lightBorder dark:text-dlightBorder">
                                |
                            </span>
                            <p> {item.email} </p>
                            <button
                                onClick={() => deleteAction(item.USid)}
                                className="hover:text-red-600 ms-auto"
                            >
                                <Trash2Icon size={20} />
                            </button>
                        </div>
                        {index < data.length - 1 && (
                            <span className="border-t border-lightBorder dark:border-dlightBorder" />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default SupervisorList;
