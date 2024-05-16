import { t } from "i18next";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

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
                        deleteAction={() => deleteAction(item.id)}
                    >
                        <p>{item.sender.email}</p>
                        <p>:</p>
                        <p>{item.title}</p>
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
