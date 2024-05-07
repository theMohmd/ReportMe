import { Trash2 } from "lucide-react";

//ListItem component
type ListItemProps = {
    title: string;
};
const ListItem = ({ title }: ListItemProps) => {
    return (
        <div className="flex py-2 justify-between items-center px-4 rounded-lg border bg-background border-lightBorder text-primary dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder">
            <p>{title}</p>
            <div>
                <button className="hover:text-red-600 flex items-center justify-center">
                    <Trash2 />
                </button>
            </div>
        </div>
    );
};

export default ListItem;
