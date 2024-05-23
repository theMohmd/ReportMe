import { t } from "i18next";
import { dateFormat } from "utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { apiDataType } from "types/apiDataType";
import { useDeleteTicket } from "./hooks/useDeleteTicket";

import List from "components/Common/List/List";
import ListItem from "components/Common/List/ListItem";
import Pagination from "components/ui/Pagination";
import { ticketReplyType } from "src/types/ticketReplyType";

type TicketRepliesUiProps = {
    data: apiDataType<ticketReplyType>;
    setPage: (input: number) => void;
    page: number;
};

//TicketsUI component
const TicketRepliesUi = ({ data, setPage, page }: TicketRepliesUiProps) => {
    const navigate = useNavigate();

    const deleteAction = useDeleteTicket();
    return (
        <div className="flex flex-col gap-2 ">
            <List>
                {data.data.map((item) => (
                    <ListItem
                        onClick={() => navigate(item.id.toString())}
                        key={item.id}
                    >
                        <div className="flex [&>*]:shrink-0 grow items-center justify-start gap-2">
                            <span className="w-0 text-sm font-thin grow line-clamp-1">
                                {item.content}
                            </span>
                            <span className="hidden text-sm font-thin ms-auto md:line-clamp-1">
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

export default TicketRepliesUi;
