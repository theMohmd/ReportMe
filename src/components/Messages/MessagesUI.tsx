import { t } from "i18next";
import { Plus } from "lucide-react";
import SmallButton from "../ui/SmallButton";
import List from "../Common/List/List";
import ListItem from "../Common/List/ListItem";
import { useState } from "react";
import NewMessageDialog from "./NewMessageDialog";
import { AnimatePresence } from "framer-motion";

//MessagesUI component
const MessagesUi = () => {
    const [dialog, setdialog] = useState(true);//todo make it false
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
                <ListItem title="test" />
                <ListItem title="test" />
                <ListItem title="test" />
                <ListItem title="test" />
                <ListItem title="test" />
            </List>
        </div>
    );
};

export default MessagesUi;
