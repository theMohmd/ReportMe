import { useState } from "react";
import { t } from "i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import UserSelect from "components/Common/UserSelect/UserSelect";
import CustomButton from "components/ui/CustomButton";
import { PlusIcon } from "lucide-react";

import { apiPostUserProject } from "api/projects/apiPostUserProject";
import { postUserProjectType } from "types/projects/postUserProjectType";
import { useGetSubordinates } from "../Account/hooks/useGetSubordinates";

type AssginProjectProps = { id: number };
//AssginProject component
const AssginProject = ({ id }: AssginProjectProps) => {
    const query = useGetSubordinates();
    const [userToAdd, setuserToAdd] = useState<number | null>(null);
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["user-project"],
        mutationFn: async (data: postUserProjectType) =>
            apiPostUserProject(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["user-project"] });
            console.log("succees");
            console.log(res);
        },
    });
    const postFunction = () => {
        if (!userToAdd) {
            console.log("err");
            return;
        }
        mutate({ user_id: userToAdd, project_id: id });
    };
    return (
        <div className="flex ">
            <div className="flex grow flex-col gap-2 justify-center items-start md:flex-row md:items-center">
                <p className="font-medium ps-2">{t("Projects.assign")}</p>
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
