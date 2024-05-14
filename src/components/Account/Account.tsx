import { t } from "i18next";
import { useAuth } from "src/contexts/Auth/useAuth";
import CustomButton from "../ui/CustomButton";
import { SquarePenIcon } from "lucide-react";
import AddSupervisor from "./AddSupervisor";
import SupervisorList from "./SupervisorList";

//Account component
const Account = () => {
    const { user } = useAuth();
    return (
        <div className="flex flex-col gap-2 p-5 pt-10 size-full">
            {/*title*/}
            <div className="flex justify-between items-center px-2 mb-5">
                <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                    {t("Account.account")}
                </p>
            </div>

            <div className="flex flex-col gap-2 grow size-full">
                {/*personal info*/}
                <div className="flex flex-col gap-2 p-5 rounded-xl border text-primary bg-background border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
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
                        <p className="py-2 px-4 rounded-xl border border-lightBorder grow dark:border-dlightBorder">
                            {user?.name}
                        </p>
                    </div>

                    <div className="flex gap-2 justify-start items-center">
                        <p className="font-medium">{t("Account.email")}</p>
                        <p className="py-2 px-4 rounded-xl border border-lightBorder grow dark:border-dlightBorder">
                            {user?.email}
                        </p>
                    </div>
                </div>

                {/*supervisors*/}
                <div className="flex flex-col gap-2 p-5 rounded-xl border grow text-primary bg-background border-lightBorder dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
                    <div className="flex gap-2 justify-between items-center mb-3 sticky top-0">
                        <p className="text-lg font-semibold">
                            {t("Account.supervisors")}
                        </p>
                    </div>
                    <AddSupervisor />

                    <div className="flex mt-5 grow overflow-y-auto h-0">
                        <SupervisorList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
