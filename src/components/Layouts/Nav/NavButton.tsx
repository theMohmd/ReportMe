import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { color } from "../../../../tailwind.config";
import { useTheme } from "src/contexts/Theme/useTheme";
//NavButton component
type NavButtonProps = {
    children: ReactNode;
    to: string;
};
const NavButton = ({ children, to }: NavButtonProps) => {
    const { theme } = useTheme();
    return (
        <NavLink
            to={to}
            style={({ isActive }) => {
                return {
                    color: isActive
                        ? theme
                            ? color.dbackground
                            : color.background
                        : "",
                    backgroundColor: isActive
                        ? theme
                            ? color.dprimary
                            : color.primary
                        : "",
                };
            }}
            className="flex justify-between items-center py-2 px-4 font-bold rounded-lg hover:shadow-lg text-primary dark:text-dprimary"
        >
            {children}
        </NavLink>
    );
};

export default NavButton;
