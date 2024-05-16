import { t } from "i18next";
import { useNavigate } from "react-router-dom";

import { dateFormat } from "utils/dateFormat";
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
    return (
        <div className="flex flex-col gap-2 grow">
            <div className="flex justify-between items-end mb-5 h-10 shrink-0">
                <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                    {t("Reports.reports")}
                </p>
            </div>
            <List>
                {data.data //filter out duplicate projects
                    .filter(
                        (obj, index, self) =>
                            index ===
                            self.findIndex(
                                (t) => t.project.id === obj.project.id
                            )
                    )
                    .map((item) => (
                        <ListItem
                            onClick={() => navigate(item.id.toString())}
                            key={item.id}
                        >
                        <div className="flex [&>*]:shrink-0 grow items-center justify-center gap-2">
                            <span className="grow w-0 line-clamp-1">{item.project.title}</span>
                            <span className="text-sm font-thin line-clamp-1 ms-auto">
                                {dateFormat(item.updated_at)}
                            </span>
                        </div>
                        </ListItem>
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
