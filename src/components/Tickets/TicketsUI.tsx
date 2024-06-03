import { t } from "i18next";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useAuth } from "contexts/Auth/useAuth";
import { dateFormat } from "utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { ticketType } from "types/ticketType";
import { apiDataType } from "types/apiDataType";
import { useDeleteTicket } from "./hooks/useDeleteTicket";

import { Plus } from "lucide-react";
import List from "components/Common/List/List";
import ListItem from "components/Common/List/ListItem";
import Pagination from "components/ui/Pagination";
import CustomButton from "components/ui/CustomButton";
import NewTicketDialog from "./NewTicketDialog";

type TicketsUiProps = {
    data: apiDataType<ticketType>;
    setPage: (input: number) => void;
    page: number;
};

//TicketsUI component
const TicketsUi = ({ data, setPage, page }: TicketsUiProps) => {
    const [dialog, setdialog] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const deleteAction = useDeleteTicket();
    return (
        <div className="flex flex-col gap-2 grow">
            <AnimatePresence>
                {dialog && (
                    <NewTicketDialog
                        close={() => {
                            setdialog(false);
                        }}
                    />
                )}
            </AnimatePresence>
            <div className="flex justify-between items-end mb-5 h-10">
                <p className="px-2 text-3xl font-semibold ">
                    {t("Tickets.tickets")}
                </p>
                <CustomButton onClick={() => setdialog(true)}>
                    <Plus />
                    <p className="px-1">
                        {t("Tickets.new", { what: t("Tickets.ticket") })}
                    </p>
                </CustomButton>
            </div>
            <List>
                {!data.data.length ? <p className="p-2" >{t("Tickets.emptyMessage",{what:t("Tickets.tickets")})}</p> :data.data.map((item) => (
                    <ListItem
                        onClick={() => navigate(item.id.toString())}
                        key={item.id}
                        deleteAction={
                            user?.id === item.user.id
                                ? () => deleteAction(item.id)
                                : undefined
                        }
                    >
                        <div className="flex [&>*]:shrink-0 grow items-center justify-start gap-2">
                            <span className="w-0 text-sm font-thin grow line-clamp-1">
                                {item.title}
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

export default TicketsUi;
