import { t } from "i18next";
import List from "../Common/List/List";
import ListItem from "../Common/List/ListItem";
import Pagination from "../ui/Pagination";
import { apiDataType } from "src/types/apiDataType";
import { Link, useNavigate } from "react-router-dom";
import { reportType } from "src/types/reports/reportType";
import CustomButton from "../ui/CustomButton";
import { ChevronLeftIcon, Plus } from "lucide-react";

type ReportsUiProps = {
    data: apiDataType<reportType>;
    setPage: (input: number) => void;
    page: number;
};
//ReportsPerProjectUi component
const ReportsPerProjectUi = ({ data, setPage, page }: ReportsUiProps) => {
    const navigate = useNavigate();
    return (
        <div className="flex overflow-y-auto flex-col gap-2 p-5 pt-10 size-full">
            <div className="h-12 flex justify-between items-center px-2 mb-5">
                <div className="flex gap-2">
                    <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                        {t("Reports.reportsPerProject")}
                    </p>
                    <Link
                        to={`/projects/${data.data[0].project.id}`}
                        className="px-2 text-3xl font-semibold text-primary dark:text-dprimary"
                    >
                        {data.data[0].project.title}
                    </Link>
                </div>
                <div className="flex gap-2">
                    <CustomButton
                        onClick={() => {
                            /*todo*/
                        }}
                    >
                        <p className="px-1">{t("Reports.newReport")}</p>
                        <Plus size={30} />
                    </CustomButton>
                    <CustomButton onClick={() => navigate(-1)}>
                        <ChevronLeftIcon size={30} />
                    </CustomButton>
                </div>
            </div>
            <List>
                {data.data.map((item) => (
                    <ListItem
                        onClick={() => navigate(item.id.toString())}
                        key={item.id}
                        title={item.description}
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

export default ReportsPerProjectUi;
