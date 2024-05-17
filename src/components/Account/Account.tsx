import { t } from "i18next";
import { motion } from "framer-motion";
import { SquarePenIcon } from "lucide-react";

import { useAuth } from "contexts/Auth/useAuth";
import {
    parentStaggerVariants,
    scaleVariants as variants,
} from "src/utils/motionVariants";

import CustomButton from "components/ui/CustomButton";
import AddSupervisor from "./AddSupervisor";
import SupervisorList from "./SupervisorList";
import SubordinateList from "./SubordinateList";

//Account component
const Account = () => {
    const { user } = useAuth();
    return (
        <div className="flex flex-col gap-2 grow">
            {/*title*/}
            <div className="flex justify-between items-center px-2 mb-5 shrink-0 h-[40px]">
                <p className="px-2 text-3xl font-semibold ">
                    {t("Account.account")}
                </p>
            </div>

            <motion.div
                variants={parentStaggerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col gap-2 grow size-full"
            >
                {/*personal info*/}
                <motion.div
                    variants={variants}
                    className="flex flex-col gap-2 p-5 rounded-xl border bg-background border-lightBorder dark:bg-dbackground dark:border-dlightBorder"
                >
                    <div className="flex gap-2 justify-between items-center mb-3">
                        <p className="text-lg font-semibold">
                            {t("Account.info")}
                        </p>

                        <CustomButton onClick={() => console.log(-1)}>
                            <SquarePenIcon size={16} />
                        </CustomButton>
                    </div>

                    <div className="flex gap-2 justify-start items-center">
                        <p className="font-medium">{t("Account.username")}</p>
                        <p className="py-2 px-4 rounded-xl border border-lightBorder w-0 grow overflow-hidden text-ellipsis dark:border-dlightBorder">
                            {user?.name}
                        </p>
                    </div>

                    <div className="flex gap-2 justify-start items-center">
                        <p className="font-medium">{t("Account.email")}</p>
                        <p className="py-2 px-4 rounded-xl border border-lightBorder w-0 grow overflow-hidden text-ellipsis dark:border-dlightBorder">
                            {user?.email}
                        </p>
                    </div>
                </motion.div>

                {/*supervisors / subordinates*/}
                <div className="flex flex-col gap-2 lg:flex-row grow ">
                    {/*supervisors*/}
                    <motion.div
                        variants={variants}
                        className="flex flex-col gap-2 p-5 rounded-xl border grow shrink-0 lg:w-0 bg-background border-lightBorder dark:bg-dbackground dark:border-dlightBorder"
                    >
                        <div className="flex sticky top-0 gap-2 justify-between items-center mb-3">
                            <p className="text-lg font-semibold">
                                {t("Account.supervisors")}
                            </p>
                        </div>
                        <AddSupervisor />

                        <div className="flex overflow-y-auto h-0 grow">
                            <SupervisorList />
                        </div>
                    </motion.div>
                    {/*subordinates*/}
                    <motion.div
                        variants={variants}
                        className="flex flex-col gap-2 p-5 rounded-xl border grow shrink-0 lg:w-0 bg-background border-lightBorder dark:bg-dbackground dark:border-dlightBorder"
                    >
                        <div className="flex sticky top-0 gap-2 justify-between items-center">
                            <p className="text-lg font-semibold">
                                {t("Account.subordinates")}
                            </p>
                        </div>
                        <SubordinateList />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Account;
