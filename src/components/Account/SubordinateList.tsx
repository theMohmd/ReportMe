import { t } from "i18next";
import { useQuery } from "@tanstack/react-query";

import { customError } from "types/customError";
import { useGetSubordinates } from "./hooks/useGetSubordinates";
import { userType } from "types/userType";
import { useDeleteSubordinate } from "./hooks/useDeleteSubordinate";

import { Trash2Icon } from "lucide-react";
import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";

type data = userType & { USid: number };

//SubordinateList component
const SubordinateList = () => {
    const query = useGetSubordinates();
    const { data, isLoading, error } = useQuery({
        queryKey: ["user-subordinate"],
        queryFn: () => query(),
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
            {data &&
                (data.length < 1 ? (
                    <p className="flex gap-2 justify-between py-2 border-t border-lightBorder dark:border-dlightBorder">
                        {t("Account.noSubordinates")}
                    </p>
                ) : (
                    data.map((item: data, index: number) => (
                        <div className="flex flex-col" key={item.USid}>
                            <div className="flex gap-2 justify-between py-2 ">
                                <p> {item.name} </p>
                                <span className="px-2 text-lightBorder dark:text-dlightBorder">
                                    |
                                </span>
                                <p> {item.email} </p>
                                <button
                                    onClick={() => deleteAction(item.USid)}
                                    className="ms-auto hover:text-red-600"
                                >
                                    <Trash2Icon size={20} />
                                </button>
                            </div>
                            {index < data.length - 1 && (
                                <span className="border-t border-lightBorder dark:border-dlightBorder" />
                            )}
                        </div>
                    ))
                ))}
        </div>
    );
};

export default SubordinateList;
