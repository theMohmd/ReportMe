import { MouseEventHandler, ReactNode } from "react";

//SmallButton component
type SmallButtonProps = {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
};
const SmallButton = ({ children, onClick }: SmallButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="flex justify-center items-center bg-primary dark:bg-dprimary text-background dark:text-dbackground size-10 rounded-lg "
        >
            {children}
        </button>
    );
};

export default SmallButton;
