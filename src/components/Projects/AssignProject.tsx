import { t } from "i18next";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGetSubordinates } from "components/Account/hooks/useGetSubordinates";
import { apiPostUserProjects, apiPostUserProjectsInputType } from "api/user-projects/apiPostUserProjects";

import { PlusIcon } from "lucide-react";
import CustomButton from "components/ui/CustomButton";
import UserSelect from "components/Common/UserSelect/UserSelect";

//AssginProject component
type AssginProjectProps = { id: number };
const AssginProject = ({ id }: AssginProjectProps) => {
    const query = useGetSubordinates();
    const [userToAdd, setuserToAdd] = useState<number | null>(null);
    const [error, seterror] = useState("");
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["user-projects"],
        mutationFn: async (data: apiPostUserProjectsInputType) =>
            apiPostUserProjects(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-projects"] });
        },
    });
    const assignAction = () => {
        if (!userToAdd) {
            seterror(t("Projects.noUser")); //todo i18n
            return;
        } else {
            seterror("");
        }
        mutate({ user_id: userToAdd, project_id: id });
    };
    return (
        <div className="flex flex-col h-[42px] justify-center ">
            <div className="flex flex-col gap-2 justify-center items-start md:flex-row md:items-center">
                <p className="font-medium text-primary ps-2 dark:text-dprimary">
                    {t("Projects.assign")}
                </p>
                <div className="flex gap-1 w-full grow md:w-fit">
                    <UserSelect
                        queryKey="getSubUsers"
                        query={query}
                        set={(i) => setuserToAdd(i)}
                    />
                    <CustomButton onClick={assignAction}>
                        <PlusIcon />
                    </CustomButton>
                </div>
            </div>
            {!!error && (
                <div className="flex gap-2 py-2">
                    <p className="invisible font-medium ps-2">
                        {t("Projects.assign")}
                    </p>
                    <p className="text-red-600 ps-4">{error}</p>
                </div>
            )}
        </div>
    );
};

export default AssginProject;
