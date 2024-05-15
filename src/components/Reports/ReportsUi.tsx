import { t } from "i18next";
import List from "../Common/List/List";
import ListItem from "../Common/List/ListItem";
import Pagination from "../ui/Pagination";
import { apiDataType } from "src/types/apiDataType";
import { useNavigate } from "react-router-dom";
import { reportType } from "types/reportType";
type ReportsUiProps = {
    data: apiDataType<reportType>;
    setPage: (input: number) => void;
    page: number;
};
//ReportsUi component
const ReportsUi = ({ data, setPage, page }: ReportsUiProps) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-2 grow">
            <div className="flex justify-between items-center px-2 mb-5 h-12">
                <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                    {t("Reports.reports")}
                </p>
            </div>
            <List>
                {data.data.map((item) => (
                    <ListItem
                        onClick={() => navigate(item.id.toString())}
                        key={item.id}
                        title={item.project.title}
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

export default ReportsUi;
