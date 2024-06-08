import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { ReactNode } from "react";
import { useLang } from "src/contexts/Lang/useLang";
import { slideVariants } from "src/utils/motionVariants";
import { useConfirm } from "../ConfirmModal/useConfirm";

//ListItem component
type ListItemProps = {
    title?: string;
    onClick?: () => void;
    children?: ReactNode;
    deleteAction?: () => void;
};
const ListItem = ({
    title,
    children,
    onClick,
    deleteAction,
}: ListItemProps) => {
    const { confirmModal } = useConfirm();
    const { lang } = useLang();
    const variants = slideVariants(lang);
    return (
        <motion.div
            variants={variants}
            onClick={onClick ? onClick : undefined}
            className="flex gap-2 justify-start items-center py-2 px-4 rounded-lg border cursor-pointer bg-background border-lightBorder dark:bg-dbackground dark:border-dlightBorder hover:shadow-cshadow"
        >
            {title && <p className="line-clamp-1 grow">{title}</p>}
            {children}
                <div className="ms-auto size-6">
                {deleteAction && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            confirmModal(deleteAction);
                        }}
                        className="flex justify-center items-center hover:text-red-600"
                    >
                        <Trash2 />
                    </button>
                    )}
                </div>
        </motion.div>
    );
};

export default ListItem;
