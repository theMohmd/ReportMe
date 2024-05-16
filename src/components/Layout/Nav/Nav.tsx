import NavButton from "./NavButton";
import {
    ClipboardPenIcon,
    FolderGit2Icon,
    Mail,
    Ticket,
    UserRound,
} from "lucide-react";
import LangButton from "components/Common/LangButton";
import ThemeButton from "components/Common/ThemeButton";
import LogoutButton from "components/Common/LogoutButton";
import { t } from "i18next";
import { useAuth } from "src/contexts/Auth/useAuth";

//Nav component
const Nav = () => {
    const { user } = useAuth();
    return (
        <div className="flex flex-col gap-2 p-2 border-e border-lightBorder dark:border-dlightBorder grow w-[200px] bg-background dark:bg-dbackground">
            <NavButton to="reports">
                <ClipboardPenIcon />
                {t("nav.reports")}
            </NavButton>
            <NavButton to="projects">
                <FolderGit2Icon />
                {t("nav.projects")}
            </NavButton>
            <NavButton to="messages">
                <Mail />
                {t("nav.messages")}
            </NavButton>
            <NavButton to="tickets">
                <Ticket />
                {t("nav.tickets")}
            </NavButton>
            <NavButton to="account">
                <UserRound />
                {user?.name}
                {/*{t("nav.account")}*/}
            </NavButton>
            <div className="mt-auto flex gap-1 justify-start ">
                <LangButton />
                <ThemeButton />
                <LogoutButton />
            </div>
        </div>
    );
};

export default Nav;
