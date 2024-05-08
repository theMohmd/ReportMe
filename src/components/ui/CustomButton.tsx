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
            className="flex justify-center font-bold gap-2 items-center bg-primary dark:bg-dprimary text-background dark:text-dbackground py-2 px-4 rounded-lg "
        >
            {children}
        </button>
    );
};

export default CustomButton;
