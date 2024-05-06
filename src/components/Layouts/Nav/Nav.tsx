import { useTranslation } from "react-i18next";
import NavButton from "./NavButton";
import {
    ListChecks,
    Mail,
    Ticket,
    UserRound,
} from "lucide-react";
import LangButton from "src/components/ui/LangButton";
import ThemeButton from "src/components/ui/ThemeButton";

//Nav component
const Nav = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-4 p-4 grow w-[200px] md:w-[250px] bg-background dark:bg-dbackground">
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
                <LangButton />
                <ThemeButton/>
            </div>
        </div>
    );
};

export default Nav;
