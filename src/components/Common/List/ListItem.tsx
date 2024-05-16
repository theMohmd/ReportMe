import { Trash2 } from "lucide-react";
import { ReactNode } from "react";

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
    return (
        <div
            onClick={onClick ? onClick : undefined}
            className="flex gap-2 justify-start items-center py-2 px-4 rounded-lg border cursor-pointer bg-background border-lightBorder text-primary dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder hover:shadow-cshadow"
        >
            {title && <p className="line-clamp-1 grow">{title}</p>}
            {children}
            <div className="ms-auto ps-4">
                {deleteAction && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteAction();
                        }}
                        className="flex justify-center items-center hover:text-red-600"
                    >
                        <Trash2 />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ListItem;
