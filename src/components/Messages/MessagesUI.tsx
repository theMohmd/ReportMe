import { t } from "i18next";
import { Plus } from "lucide-react";
import SmallButton from "../ui/SmallButton";
import List from "../Common/List/List";
import ListItem from "../Common/List/ListItem";
import { useState } from "react";
import NewMessageDialog from "./NewMessageDialog";
import { AnimatePresence } from "framer-motion";
import { messageType } from "src/types/messageType";

type MessagesUiProps = {
    data: messageType[];
};
//MessagesUI component
const MessagesUi = ({ data }: MessagesUiProps) => {
    const [dialog, setdialog] = useState(false);
    return (
        <div className="flex flex-col gap-2 p-5 pt-10 size-full">
            <AnimatePresence>
                {dialog && (
                    <NewMessageDialog
                        close={() => {
                            setdialog(false);
                        }}
                    />
                )}
            </AnimatePresence>
            <div className="flex justify-between items-center px-2 mb-5">
                <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                    {t("messages.messages")}
                </p>
                <SmallButton onClick={() => setdialog(true)}>
                    <Plus size={30} />
                </SmallButton>
            </div>
            <List>
                {data.map((item) => (
                    <ListItem key={item.id} title={item.title} />
                ))}
            </List>
        </div>
    );
};

export default MessagesUi;
