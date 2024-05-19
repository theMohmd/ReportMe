import { t } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { dateFormat } from "utils/dateFormat";
import { apiDataType } from "types/apiDataType";
import { ticketType } from "types/ticketType";
import { useDeleteTicket } from "./hooks/useDeleteTicket";

import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

import CustomButton from "components/ui/CustomButton";
import List from "components/Common/List/List";
import ListItem from "components/Common/List/ListItem";
import NewTicketDialog from "./NewTicketDialog";
import Pagination from "components/ui/Pagination";

type TicketsUiProps = {
    data: apiDataType<ticketType>;
    setPage: (input: number) => void;
    page: number;
};

//TicketsUi component
const TicketsUi = ({ data, setPage, page }: TicketsUiProps) => {
    const [dialog, setdialog] = useState(false);
    const navigate = useNavigate();

    const { mutate: deleteRequest } = useDeleteTicket();
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
            <div className="flex justify-between items-end mb-5 h-10 shrink-0">
                <p className="px-2 text-3xl font-semibold ">
                    {t("Tickets.tickets")}
                </p>
                <CustomButton onClick={() => setdialog(true)}>
                    <Plus />
                    <p className="px-1">{t("Tickets.newTicket")}</p>
                </CustomButton>
            </div>
            <List>
                {data.data.map((item) => (
                    <ListItem
                        onClick={() => navigate(item.id.toString())}
                        key={item.id}
                        deleteAction={() => deleteAction(item.id)}
                    >
                        <div className="flex [&>*]:shrink-0 grow items-center justify-center gap-2">
                            <span className="line-clamp-1 grow w-0">{item.title}</span>
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

export default TicketsUi;