import { t } from "i18next";
import { useQuery } from "@tanstack/react-query";

import { customError } from "types/customError";
import { useGetSubordinates } from "./hooks/useGetSubordinates";
import { userType } from "types/userType";
import { useDeleteSubordinate } from "./hooks/useDeleteSubordinate";

import { Trash2Icon } from "lucide-react";
import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import { useState } from "react";
import Pagination from "../ui/Pagination";
import { motion } from "framer-motion";
import { parentStaggerVariants, slideVariants } from "src/utils/motionVariants";
import { useLang } from "src/contexts/Lang/useLang";

type data = userType & { USid: number };

//SubordinateList component
const SubordinateList = () => {
    const [page, setPage] = useState(0);
    const query = useGetSubordinates();

    const { data, isLoading, error } = useQuery({
        queryKey: ["user-subordinate", page],
        queryFn: () => query(page + 1),
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

    const { lang } = useLang();
    const variants = slideVariants(lang);
    if (isLoading)
        return <Loader size={40} className="text-primary dark:text-dprimary" />;
    if (error) return <ErrorPage error={error as customError} />;
    console.log(data);
    return (
        <div className="flex grow shrink-0 flex-col ">
            {data &&
                (data.data.length < 1 ? (
                    <p className="flex gap-2 justify-between py-2 border-t border-lightBorder dark:border-dlightBorder">
                        {t("Account.noSubordinates")}
                    </p>
                ) : (
                    <>
                        <motion.div
                            className="flex grow flex-col "
                            variants={parentStaggerVariants}
                            initial="initial"
                            animate="animate"
                        >
                            {data.data.map((item: data, index: number) => (
                                <motion.div
                                variants={variants}
                                    className="flex flex-col"
                                    key={item.USid}
                                >
                                    <div className="flex gap-2 justify-between py-2 ">
                                        <p> {item.name} </p>
                                        <span className="px-2 text-lightBorder dark:text-dlightBorder">
                                            |
                                        </span>
                                        <p> {item.email} </p>
                                        <button
                                            onClick={() =>
                                                deleteAction(item.USid)
                                            }
                                            className="ms-auto hover:text-red-600"
                                        >
                                            <Trash2Icon size={20} />
                                        </button>
                                    </div>
                                    {index < data.data.length - 1 && (
                                        <span className="border-t border-lightBorder dark:border-dlightBorder" />
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                        <div className="mt-auto">
                            <Pagination
                                initialPage={page}
                                setPage={setPage}
                                pageCount={Math.ceil(data.total / 10)}
                            />
                        </div>
                    </>
                ))}
        </div>
    );
};

export default SubordinateList;
