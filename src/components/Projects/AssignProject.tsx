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
            return;//todo
        }
        mutate({ user_id: userToAdd, project_id: id });
    };
    return (
        <div className="flex ">
            <div className="flex grow flex-col gap-2 justify-center items-start md:flex-row md:items-center">
                <p className="font-medium text-primary dark:text-dprimary ps-2">{t("Projects.assign")}</p>
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
        </div>
    );
};

export default AssginProject;
