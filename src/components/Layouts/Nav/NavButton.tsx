import { ReactNode } from "react";
import { Link } from "react-router-dom";

//NavButton component
type NavButtonProps = {
    children: ReactNode;
    to: string;
};
const NavButton = ({ children, to }: NavButtonProps) => {
    return (
        <Link
            to={to}
            className="flex justify-between items-center py-2 px-4 font-bold rounded-lg text-primary hover:shadow-lg"
        >
            {children}
        </Link>
    );
};

export default NavButton;
