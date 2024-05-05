import { useTranslation } from "react-i18next";
import NavButton from "./NavButton";
import { ListChecks, Mail, Ticket, UserRound } from "lucide-react";

//Nav component
const Nav = () => {
    const { t } = useTranslation();
    return (
        <div className="flex gap-4 flex-col px-4 md:px-8 grow w-[250px] bg-background dark:bg-dbackground">
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
        </div>
    );
};

export default Nav;
