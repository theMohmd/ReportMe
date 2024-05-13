import { t } from "i18next";
import { Plus } from "lucide-react";
import CustomButton from "components/ui/CustomButton";
import List from "components/Common/List/List";
import ListItem from "components/Common/List/ListItem";
import { useState } from "react";
import NewMessageDialog from "./NewMessageDialog";
import { AnimatePresence } from "framer-motion";
import { messageType } from "types/messageType";
import { useNavigate } from "react-router-dom";
import { apiDataType } from "src/types/apiDataType";

type MessagesUiProps = {
    data: apiDataType<messageType>;
};
//MessagesUI component
const MessagesUi = ({ data }: MessagesUiProps) => {
    const [dialog, setdialog] = useState(false);
    const navigate = useNavigate();
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
                <CustomButton onClick={() => setdialog(true)}>
                    <p className="px-1">{t("messages.newMessage")}</p>
                    <Plus size={30} />
                </CustomButton>
            </div>
            <List>
                {data.data.map((item) => (
                    <ListItem
                        onClick={() => navigate(item.id.toString())}
                        key={item.id}
                        title={item.title}
                    />
                ))}
            </List>
        </div>
    );
};

export default MessagesUi;
