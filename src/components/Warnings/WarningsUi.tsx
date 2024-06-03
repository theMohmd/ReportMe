import { t } from "i18next";
import { useNavigate } from "react-router-dom";

import { useAuth } from "contexts/Auth/useAuth";
import { dateFormat } from "utils/dateFormat";
import { apiDataType } from "types/apiDataType";
import { userProjectType } from "types/userProjectType";

import List from "components/Common/List/List";
import ListItem from "components/Common/List/ListItem";
import Pagination from "components/ui/Pagination";

type WarningsUiProps = {
    data: apiDataType<userProjectType>;
    setPage: (input: number) => void;
    page: number;
};
//WarningsUi component
const WarningsUi = ({ data, setPage, page }: WarningsUiProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <div className="flex flex-col gap-2 grow">
            <div className="flex justify-between items-end mb-5 h-10 shrink-0">
                <p className="px-2 text-3xl font-semibold ">
                    {t("Warnings.warnings")}
                </p>
            </div>
            <List>
                {!data.data.length ? <p className="p-2" >{t("Warnings.emptyMessage",{what:t("Warnings.warnings")})}</p> :data.data
                    .filter(//filter out duplicate projects
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

export default WarningsUi;
