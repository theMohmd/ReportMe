import { t } from "i18next";
import { useNavigate } from "react-router-dom";

import { apiDataType } from "types/apiDataType";
import { userProjectType } from "types/userProjectType";

import List from "components/Common/List/List";
import ListItem from "components/Common/List/ListItem";
import Pagination from "components/ui/Pagination";

type ReportsUiProps = {
    data: apiDataType<userProjectType>;
    setPage: (input: number) => void;
    page: number;
};
//ReportsUi component
const ReportsUi = ({ data, setPage, page }: ReportsUiProps) => {
    const navigate = useNavigate();
    console.log(data.data)
    console.log([...new Set(data.data)])
    return (
        <div className="flex flex-col gap-2 grow">
            <div className="flex justify-between items-center px-2 mb-5 h-[40px] shrink-0">
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
