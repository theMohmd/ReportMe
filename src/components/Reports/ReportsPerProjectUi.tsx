import { t } from "i18next";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, Plus } from "lucide-react";

import { useAuth } from "contexts/Auth/useAuth";
import { reportType } from "types/reportType";
import { dateFormat } from "src/utils/dateFormat";
import { apiDataType } from "types/apiDataType";
import { userProjectType } from "types/userProjectType";

import List from "components/Common/List/List";
import ListItem from "components/Common/List/ListItem";
import Pagination from "components/ui/Pagination";
import CustomButton from "components/ui/CustomButton";
import NewReportDialog from "./NewReportDialog";
import { useDeleteReport } from "./hooks/useDeleteReport";

type ReportsUiProps = {
    reports: apiDataType<reportType>;
    setPage: (input: number) => void;
    page: number;
    user_project: userProjectType;
};
//ReportsPerProjectUi component
const ReportsPerProjectUi = ({
    reports,
    user_project,
    setPage,
    page,
}: ReportsUiProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [dialog, setdialog] = useState(false);
    const deleteReport = useDeleteReport();
    return (
        <div className="flex flex-col gap-2 grow">
            <AnimatePresence>
                {dialog && (
                    <NewReportDialog
                        user_project_id={user_project.id}
                        close={() => {
                            setdialog(false);
                        }}
                    />
                )}
            </AnimatePresence>
            <div className="flex justify-between items-end mb-5 h-10 shrink-0">
                <div className="flex grow">
                    <p className="px-2 text-3xl font-semibold ">
                        {t("Reports.reportsPerProject")}
                    </p>

                    <Link
                        to={`/projects/${user_project.project.id}`}
                        className="text-3xl line-clamp-1 grow w-0 font-semibold "
                    >
                        {user_project.project.title}
                    </Link>
                </div>
                <div className="flex gap-2">
                    {user?.id !== user_project.project.user.id && (
                        <CustomButton onClick={() => setdialog(true)}>
                            <Plus />
                            <p className="px-1">
                                {t("Reports.new", {
                                    what: t("Reports.report"),
                                })}
                            </p>
                        </CustomButton>
                    )}
                    <CustomButton onClick={() => navigate(-1)}>
                        <ChevronLeftIcon />
                    </CustomButton>
                </div>
            </div>
            <List>
                {!reports.data.length ? <p className="p-2" >{t("Reports.emptyMessage",{what:t("Reports.reports")})}</p> :reports.data.map((item) => (
                    <ListItem
                        onClick={() => navigate(item.id.toString())}
                        key={item.id}
                        deleteAction={
                            item.user.id === user?.id
                                ? () => deleteReport(item.id)
                                : undefined
                        }
                    >
                        <div className="flex [&>*]:shrink-0 grow items-center justify-center gap-2">
                            <span className="line-clamp-1 w-[10ch]">
                                {user?.id !== item.user.id
                                    ? item.user.name
                                    : item.project.user.name}
                            </span>
                            <span className="line-clamp-1 grow w-0">
                                {item.description}
                            </span>
                            <span className="text-sm line-clamp-1 font-thin ms-auto">
                                {dateFormat(item.updated_at)}
                            </span>
                        </div>
                    </ListItem>
                ))}
            </List>
            <Pagination
                initialPage={page}
                setPage={setPage}
                pageCount={Math.ceil(reports.total / 10)}
            />
        </div>
    );
};

export default ReportsPerProjectUi;
