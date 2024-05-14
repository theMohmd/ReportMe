import { Trash2 } from "lucide-react";
import { ReactNode } from "react";

//ListItem component
type ListItemProps = {
    title: string;
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
    return (
        <div
            onClick={onClick ? onClick : undefined}
            className="flex py-2 justify-start gap-2 cursor-pointer items-center px-4 rounded-lg border bg-background border-lightBorder text-primary dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder"
        >
            <p>{title}</p>
            {children}
            <div className="ms-auto">
                {deleteAction && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteAction();
                        }}
                        className="hover:text-red-600 flex items-center justify-center"
                    >
                        <Trash2 />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ListItem;
