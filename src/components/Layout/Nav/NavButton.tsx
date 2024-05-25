import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { color } from "src/../tailwind.config";
//NavButton component
type NavButtonProps = {
    children: ReactNode;
    to: string;
};
const NavButton = ({ children, to }: NavButtonProps) => {
    return (
        <NavLink
            to={to}
            style={({ isActive }) => {
                return {
                    color: isActive ? color.background : "",
                    backgroundColor: isActive ? color.dbutton : "",
                };
            }}
            className="flex gap-2 justify-between items-center py-2 px-4 font-semibold rounded-lg border border-black border-opacity-0 duration-200 hover:scale-105 hover:shadow-cshadow"
        >
            {children}
        </NavLink>
    );
};

export default NavButton;
