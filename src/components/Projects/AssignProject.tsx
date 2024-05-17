import { t } from "i18next";
import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    apiPostUserProjects,
    apiPostUserProjectsInputType,
} from "api/user-projects/apiPostUserProjects";

import Loader from "components/ui/Loader";
import UserSelect from "components/Common/UserSelect/UserSelect";
import CustomButton from "components/ui/CustomButton";
import { scaleVariants } from "src/utils/motionVariants";
import { useGetSubordinates } from "./hooks/useGetSubordinates";

//AssginProject component
type AssginProjectProps = { id: number };
const AssginProject = ({ id }: AssginProjectProps) => {
    const query = useGetSubordinates();
    const [userToAdd, setuserToAdd] = useState<number | null>(null);
    const [error, seterror] = useState("");
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["user-projects"],
        mutationFn: async (data: apiPostUserProjectsInputType) =>
            apiPostUserProjects(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-projects"] });
        },
    });
    const assignAction = () => {
        if (!userToAdd) {
            seterror(t("Projects.noUser"));
            return;
        } else {
            seterror("");
        }
        mutate({ user_id: userToAdd, project_id: id });
    };
    return (
        <motion.div
            variants={scaleVariants}
            className="flex flex-col justify-center "
        >
            <div className="flex flex-col gap-2 justify-center items-start md:flex-row md:items-center">
                <p className="font-medium ps-2 ">
                    {t("Projects.assign")}
                </p>
                <div className="flex h-[42px] gap-1 w-full grow md:w-fit">
                    <UserSelect
                        queryKey="getSubUsers"
                        query={(input,mode)=>query(input,mode)}
                        set={(i) => setuserToAdd(i)}
                    />
                    <CustomButton onClick={assignAction}>
                        {isPending ? <Loader size={24} /> : <PlusIcon />}
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
        </motion.div>
    );
};

export default AssginProject;
