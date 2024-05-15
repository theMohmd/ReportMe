import { useQuery } from "@tanstack/react-query";

import { customError } from "types/customError";
import { useGetSubordinates } from "./hooks/useGetSubordinates";
import { userType } from "types/auth";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import { Trash2Icon } from "lucide-react";
import { useDeleteSubordinate } from "./hooks/useDeleteSubordinate";
import { t } from "i18next";
type data = userType & { USid: number };

//SubordinateList component
const SubordinateList = () => {
    const query = useGetSubordinates();
    const { data, isLoading, error } = useQuery({
        queryKey: ["user-subordinate"],
        queryFn: query,
    });
    const { mutate: deleteRequest } = useDeleteSubordinate();
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
                    {t("Account.noSubordinates")}
                </p>
            ) : (
                data.map((item: data) => (
                    <div
                        key={item.USid}
                        className="flex gap-2 justify-between py-2 border-t border-lightBorder dark:border-dlightBorder"
                    >
                        <div className="flex">
                            <p> {item.name} </p>
                            <span className="px-2 text-lightBorder dark:text-dlightBorder">
                                |
                            </span>
                            <p> {item.email} </p>
                        </div>
                        <button
                            onClick={() => deleteAction(item.USid)}
                            className="hover:text-red-600"
                        >
                            <Trash2Icon size={20} />
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default SubordinateList;
