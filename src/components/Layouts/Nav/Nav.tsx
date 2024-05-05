import { useTranslation } from "react-i18next";
import NavButton from "./NavButton";
import {
    Languages,
    ListChecks,
    Mail,
    SunMoon,
    Ticket,
    UserRound,
} from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "src/contexts/Theme/ThemeContext";
import { themeContextType } from "src/types/theme";
import { useLang } from "src/hooks/useLang";

//Nav component
const Nav = () => {
    const { t } = useTranslation();
    const { settheme } = useContext(ThemeContext) as themeContextType;
    const { lang } = useLang();
    return (
        <div className="flex flex-col gap-4 p-4 grow w-[250px] bg-background dark:bg-dbackground">
            <NavButton to="projects">
                <ListChecks size={32} />
                {t("navProjects")}
            </NavButton>
            <NavButton to="messages">
                <Mail size={32} />
                {t("navMessages")}
            </NavButton>
            <NavButton to="tickets">
                <Ticket size={32} />
                {t("navTickets")}
            </NavButton>
            <NavButton to="account">
                <UserRound size={32} />
                {t("navAccount")}
            </NavButton>
            <div className="mt-auto flex gap-2 ">
                <button
                    onClick={() => {
                        settheme((prev) => !prev);
                    }}
                    className="flex justify-center items-center bg-primary dark:bg-dprimary text-background dark:text-dbackground size-10 rounded-lg "
                >
                    <Languages size={32} />
                </button>
                <button
                    onClick={() => {
                        settheme((prev) => !prev);
                    }}
                    className="flex justify-center items-center bg-primary dark:bg-dprimary text-background dark:text-dbackground size-10 rounded-lg "
                >
                    <SunMoon size={32} />
                </button>
            </div>
        </div>
    );
};

export default Nav;
