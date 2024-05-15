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
            className="flex justify-between items-center py-2 px-4 font-semibold rounded-lg hover:shadow-cshadow text-primary dark:text-dprimary"
        >
            {children}
        </NavLink>
    );
};

export default NavButton;
