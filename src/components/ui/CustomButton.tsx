import { MouseEventHandler, ReactNode } from "react";

//SmallButton component
type SmallButtonProps = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    mode?: "Primary" | "Secondary" | "Red";
};
const CustomButton = ({
    children,
    onClick,
    mode = "Primary",
}: SmallButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`flex justify-center font-bold gap-2 items-center hover:shadow-cshadow ${
                mode === "Red"
                    ? "p-2 bg-red-600"
                    : mode === "Secondary"
                      ? "p-1 bg-background dark:bg-dbackground border-[2px] border-dbutton text-dbutton"
                      : "p-2 bg-dbutton"
            } text-background rounded-lg `}
        >
            {children}
        </button>
    );
};

export default CustomButton;
