import { Trash2Icon } from "lucide-react";
import Pagination from "../ui/Pagination";
import { motion } from "framer-motion";
import { parentStaggerVariants, slideVariants } from "src/utils/motionVariants";
import { useLang } from "src/contexts/Lang/useLang";
import { userType } from "src/types/userType";

//UserListUi component
type type = userType & { deleteId: number };
type UserListUiProps = {
    page: number;
    emptyMessage:string,
    setPage: (input: number) => void;
    data: {
        total: number;
        data: type[];
    };
    deleteAction: (id:number)=>void;
};
const UserListUi = ({
    emptyMessage,
    page,
    setPage,
    data,
    deleteAction,
}: UserListUiProps) => {
    const { lang } = useLang();
    const variants = slideVariants(lang);
    return (
        <div className="flex grow shrink-0 flex-col ">
            {data &&
                (data.data.length < 1 ? (
                    <p className="flex gap-2 justify-between py-2 dark:border-dlightBorder">
                        {emptyMessage}
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
                                    key={item.deleteId}
                                >
                                    <div className="flex gap-2 py-2 max-w-full">
                                        <p className="w-0 grow overflow-hidden text-ellipsis h-6">
                                            {/*<p className="w-0 grow line-clamp-1 text-ellipsis overflow-hidden">*/}
                                            {item.name}{" "}
                                        </p>
                                        <span className="px-2 text-lightBorder dark:text-dlightBorder">
                                            |
                                        </span>
                                        <p className="w-0 grow-[2] text-ellipsis overflow-hidden ">
                                            {" "}
                                            {item.email}{" "}
                                        </p>
                                        <button
                                            onClick={() =>
                                                deleteAction(item.deleteId)
                                            }
                                            className="hover:text-red-600 "
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
