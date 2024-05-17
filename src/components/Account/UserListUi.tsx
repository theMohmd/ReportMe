import { t } from "i18next";
import { Trash2Icon } from "lucide-react";
import Pagination from "../ui/Pagination";
import { motion } from "framer-motion";
import { parentStaggerVariants, slideVariants } from "src/utils/motionVariants";
import { useLang } from "src/contexts/Lang/useLang";
import { userType } from "src/types/userType";
import { useDeleteUserSupervisors } from "./hooks/useDeleteSupervisor";

//UserListUi component
type type = userType & { USid: number };
type UserListUiProps = {
    page: number;
    setPage: (input: number) => void;
    data: {
        total: number;
        data: type[];
    };
};
const UserListUi = ({ page, setPage, data }: UserListUiProps) => {
    const { lang } = useLang();
    const variants = slideVariants(lang);
    const { mutate: deleteRequest } = useDeleteUserSupervisors();
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
                            {data.data.map((item: type, index: number) => (
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

export default UserListUi;
