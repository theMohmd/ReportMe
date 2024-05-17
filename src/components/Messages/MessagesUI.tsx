import { t } from "i18next";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useAuth } from "contexts/Auth/useAuth";
import { dateFormat } from "utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { messageType } from "types/messageType";
import { apiDataType } from "types/apiDataType";
import { useDeleteMessage } from "./hooks/useDeleteMessage";

import { Plus } from "lucide-react";
import List from "components/Common/List/List";
import ListItem from "components/Common/List/ListItem";
import Pagination from "components/ui/Pagination";
import CustomButton from "components/ui/CustomButton";
import NewMessageDialog from "./NewMessageDialog";

type MessagesUiProps = {
    data: apiDataType<messageType>;
    setPage: (input: number) => void;
    page: number;
};

//MessagesUI component
const MessagesUi = ({ data, setPage, page }: MessagesUiProps) => {
    const [dialog, setdialog] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const { mutate: deleteRequest } = useDeleteMessage();
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
                    <NewMessageDialog
                        close={() => {
                            setdialog(false);
                        }}
                    />
                )}
            </AnimatePresence>
            <div className="flex justify-between items-end mb-5 h-10">
                <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                    {t("Messages.messages")}
                </p>
                <CustomButton onClick={() => setdialog(true)}>
                    <Plus />
                    <p className="px-1">{t("Messages.newMessage")}</p>
                </CustomButton>
            </div>
            <List>
                {data.data.map((item) => (
                    <ListItem
                        onClick={() => navigate(item.id.toString())}
                        key={item.id}
                        deleteAction={
                            user?.id === item.sender.id
                                ? () => deleteAction(item.id)
                                : undefined
                        }
                    >
                        <div className="flex [&>*]:shrink-0 grow items-center justify-start gap-2">
                            <span className="w-[10ch] line-clamp-1">
                                {user?.id === item.receiver.id
                                    ? item.sender.name
                                    : item.receiver.name}
                            </span>
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

export default MessagesUi;
