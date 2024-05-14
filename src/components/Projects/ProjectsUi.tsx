import { t } from "i18next";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CustomButton from "components/ui/CustomButton";
import List from "components/Common/List/List";
import ListItem from "components/Common/List/ListItem";
import NewProjectDialog from "./NewProjectDialog";
import { apiDataType } from "types/apiDataType";
import { projectType } from "src/types/projects/projectType";
import Pagination from "components/ui/Pagination";
import { useDeleteProject } from "./hooks/useDeleteProject";

type ProjectsUiProps = {
    data: apiDataType<projectType>;
    setPage: (input: number) => void;
    page: number;
};

//ProjectsUi component
const ProjectsUi = ({ data, setPage, page }: ProjectsUiProps) => {
    const [dialog, setdialog] = useState(false);
    const navigate = useNavigate();

    const { mutate: deleteRequest } = useDeleteProject();
    const deleteAction = (id: number) => {
        deleteRequest(
            { id: id },
            {
                onError() {
                    console.log("error");
                },
            }
        );
    };
    return (
        <div className="flex overflow-y-auto flex-col gap-2 p-5 pt-10 size-full">
            <AnimatePresence>
                {dialog && (
                    <NewProjectDialog
                        close={() => {
                            setdialog(false);
                        }}
                    />
                )}
            </AnimatePresence>
            <div className="flex justify-between items-center px-2 mb-5">
                <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                    {t("Projects.projects")}
                </p>
                <CustomButton onClick={() => setdialog(true)}>
                    <p className="px-1">{t("Projects.newProject")}</p>
                    <Plus size={30} />
                </CustomButton>
            </div>
            <List>
                {data.data.map((item) => (
                    <ListItem
                        onClick={() => navigate(item.id.toString())}
                        key={item.id}
                        deleteAction={() => deleteAction(item.id)}
                        title={item.title}
                    />
                ))}
            </List>
            <Pagination
                initialPage={page}
                setPage={setPage}
                pageCount={Math.ceil(data.total / 10)}
            />
        </div>
    );
};

export default ProjectsUi;
