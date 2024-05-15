import { useState } from "react";
import { t } from "i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiPostUserProject } from "api/projects/apiPostUserProject";
import { postUserProjectType } from "api/projects/apiPostUserProject";
import { useGetSubordinates } from "components/Account/hooks/useGetSubordinates";

import UserSelect from "components/Common/UserSelect/UserSelect";
import CustomButton from "components/ui/CustomButton";
import { PlusIcon } from "lucide-react";

type AssginProjectProps = { id: number };
//AssginProject component
const AssginProject = ({ id }: AssginProjectProps) => {
    const query = useGetSubordinates();
    const [userToAdd, setuserToAdd] = useState<number | null>(null);
    const [error, seterror] = useState("");
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["user-projects"],
        mutationFn: async (data: postUserProjectType) =>
            apiPostUserProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-projects"] });
        },
    });
    const postFunction = () => {
        if (!userToAdd) {
            seterror(t("Projects.noUser")); //todo i18n
            return;
        } else {
            seterror("");
        }
        mutate({ user_id: userToAdd, project_id: id });
    };
    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-2 justify-center items-start md:flex-row md:items-center">
                <p className="font-medium text-primary dark:text-dprimary ps-2">
                    {t("Projects.assign")}
                </p>
                <div className="flex grow gap-2 md:w-fit w-full">
                    <UserSelect
                        queryKey="getSubUsers"
                        query={query}
                        set={(i) => setuserToAdd(i)}
                    />
                    <CustomButton onClick={postFunction}>
                        <PlusIcon />
                    </CustomButton>
                </div>
            </div>
            {!!error && (
                <div className="flex gap-2 py-2">
                    <p className="font-medium invisible ps-2">
                        {t("Projects.assign")}
                    </p>
                    <p className="ps-4 text-red-600">{error}</p>
                </div>
            )}
        </div>
    );
};

export default AssginProject;
