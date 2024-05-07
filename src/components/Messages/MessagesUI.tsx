import { t } from "i18next";
import { Plus } from "lucide-react";
import SmallButton from "../ui/SmallButton";
import List from "../Common/List/List";
import ListItem from "../Common/List/ListItem";
import { useState } from "react";
import NewMessageDialog from "./NewMessageDialog";

//MessagesUI component
const MessagesUi = () => {
    const [dialog, setdialog] = useState(false);
    return (
        <div className="flex flex-col gap-2 p-5 pt-10 size-full">
            {dialog && <NewMessageDialog />}
            <div className="flex justify-between items-center px-2 mb-5">
                <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                    {t("messages.title")}
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
