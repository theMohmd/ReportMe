import { t } from "i18next";
import { useNavigate } from "react-router-dom";

import { useAuth } from "contexts/Auth/useAuth";
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
    const { user } = useAuth();
    return (
        <div className="flex flex-col gap-2 grow">
            <div className="flex justify-between items-end mb-5 h-10 shrink-0">
                <p className="px-2 text-3xl font-semibold ">
                    {t("Reports.reports")}
                </p>
            </div>
            <List>
                {!data.data.length ? <p className="p-2" >{t("Reports.emptyMessage",{what:t("Reports.reports")})}</p> :data.data 
                    .map((item) => (
                        <ListItem
                            onClick={() => navigate(item.id.toString())}
                            key={item.id}
                        >
                            <div className="flex [&>*]:shrink-0 grow items-center justify-center gap-2">
                                {user?.id === item.user.id && (
                                    <span className="line-clamp-1 w-[10ch]">
                                        {item.project.user.name}
                                    </span>
                                )}
                                <span className="grow w-0 line-clamp-1">
                                    {item.project.title}
                                </span>
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
