import { MouseEventHandler, ReactNode } from "react";

//SmallButton component
type SmallButtonProps = {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
};
const CustomButton = ({ children, onClick }: SmallButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="flex justify-center font-bold gap-2 items-center hover:shadow-cshadow bg-dbutton text-background p-2 rounded-lg "
        >
            {children}
        </button>
    );
};

export default CustomButton;
