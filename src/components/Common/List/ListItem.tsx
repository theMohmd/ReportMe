import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeleteProject } from "src/components/Projects/hooks/useDeleteProject";

//ListItem component
type ListItemProps = {
    title: string;
    id: number;
    onClick?: () => void;
};
const ListItem = ({ title, id, onClick }: ListItemProps) => {
    const navigate = useNavigate();
    const { mutate: deleteRequest } = useDeleteProject();
    const deleteAction = () => {
        deleteRequest(
            { id: id },
            {
                onSuccess() {
                    navigate(-1);
                },
                onError() {
                    console.log("error");
                },
            }
        );
    };
    return (
        <div
            onClick={onClick ? onClick : undefined}
            className="flex py-2 justify-between cursor-pointer items-center px-4 rounded-lg border bg-background border-lightBorder text-primary dark:text-dprimary dark:bg-dbackground dark:border-dlightBorder"
        >
            <p>{title}</p>
            <div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteAction();
                    }}
                    className="hover:text-red-600 flex items-center justify-center"
                >
                    <Trash2 />
                </button>
            </div>
        </div>
    );
};

export default ListItem;
