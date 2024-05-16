import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";

import { apiGetUsers } from "api/users/apiGetUsers";
import { apiPostUserSupervisor } from "api/user-supervisor/apiPostUserSupervisor";
import { postUserSupervisorType } from "api/user-supervisor/apiPostUserSupervisor";

import UserSelect from "components/Common/UserSelect/UserSelect";
import CustomButton from "components/ui/CustomButton";
import { PlusIcon } from "lucide-react";

//AddSupervisor component
const AddSupervisor = () => {
    const [userToAdd, setuserToAdd] = useState<number | null>(null);
    const [error, seterror] = useState("");

    const selectQuery = (input: string, mode: string) =>
        apiGetUsers({ input: input, mode: mode });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["user-supervisor"],
        mutationFn: async (data: postUserSupervisorType) =>
            apiPostUserSupervisor(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-supervisor"] });
        },
    });
    const postFunction = () => {
        if (!userToAdd) {
            seterror(t("Account.noSupervisor")); //todo i18n
            return;
        } else {
            seterror("");
        }
        mutate({ supervisor_id: userToAdd });
    };
    return (
        <div className="flex flex-col">
            <div className="flex grow flex-col gap-2 justify-center items-start md:flex-row md:items-center">
                <p className="font-medium ">{t("Account.addSupervisor")}</p>
                <div className="flex grow gap-2 md:w-fit w-full">
                    <UserSelect
                        queryKey="getSubUsers"
                        query={selectQuery}
                        set={(i) => setuserToAdd(i)}
                    />
                    <CustomButton onClick={postFunction}>
                        <PlusIcon />
                    </CustomButton>
                </div>
            </div>
            {!!error && (
                <div className="flex gap-2 py-2">
                    <p className="font-medium invisible ">
                        {t("Account.addSupervisor")}
                    </p>
                    <p className="ps-4 text-red-600">{error}</p>
                </div>
            )}
        </div>
    );
};

export default AddSupervisor;
