import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";

import { apiGetUsers } from "api/messages/apiGetUsers";
import { apiPostUserSupervisor } from "api/user-supervisor/apiPostUserSupervisor";
import { postUserSupervisorType } from "api/user-supervisor/apiPostUserSupervisor";

import UserSelect from "components/Common/UserSelect/UserSelect";
import CustomButton from "components/ui/CustomButton";
import { PlusIcon } from "lucide-react";

//AddSupervisor component
const AddSupervisor = () => {
    const [userToAdd, setuserToAdd] = useState<number | null>(null);

    const selectQuery = (input: string, mode: string) =>
        apiGetUsers(input, mode);

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
            return;//todo
        }
        mutate({ supervisor_id: userToAdd });
    };
    return (
        <div className="flex ">
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
        </div>
    );
};

export default AddSupervisor;
