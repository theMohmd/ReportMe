import { useContext } from "react";
import { motion } from "framer-motion";
import { t } from "i18next";
import CustomButton from "src/components/ui/CustomButton";
import {
    ConfirmModalContext,
    ConfirmModalContextType,
} from "./ConfirmModalContext";

//ConfirmDialog component
const ConfirmModal = () => {
    const { close, action } = useContext(
        ConfirmModalContext
    ) as ConfirmModalContextType;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex overflow-hidden absolute top-0 left-0 z-50 justify-center items-center p-5 h-dvh w-dvw backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex flex-col p-5 w-96 h-36 rounded-xl border bg-background2 border-lightBorder dark:border-dlightBorder dark:bg-dbackground2"
            >
                <p className="grow text-xl font-bold">
                    {t("common.deleteMessage")}
                </p>
                <div className="flex gap-2 [&>*]:grow">
                    <CustomButton mode="Secondary" onClick={close}>
                        {t("common.cancel")}
                    </CustomButton>
                    <CustomButton
                        mode="Red"
                        onClick={() => {
                            action();
                            close();
                        }}
                    >
                        {t("common.delete")}
                    </CustomButton>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ConfirmModal;
