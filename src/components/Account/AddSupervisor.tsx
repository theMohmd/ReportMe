import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiGetUsers } from "src/api/messages/apiGetUsers";
import UserSelect from "../Common/UserSelect/UserSelect";
import CustomButton from "../ui/CustomButton";
import { PlusIcon } from "lucide-react";
import { t } from "i18next";
import { apiPostUserSupervisor } from "src/api/user-supervisor/apiPostUserSupervisor";
import { postUserSupervisorType } from "src/types/postUserSupervisorType";

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
            console.log("succees");
        },
    });
    const postFunction = () => {
        if (!userToAdd) {
            console.log("err");
            return;
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
