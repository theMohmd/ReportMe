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
    const { user } = useAuth();//todo delete
    return (
        <div className="flex flex-col gap-4 p-4 grow w-[200px] md:w-[250px] bg-background dark:bg-dbackground">
            <NavButton to="reports">
                <ClipboardPenIcon size={32} />
                {t("nav.reports")}
            </NavButton>
            <NavButton to="projects">
                <FolderGit2Icon size={32} />
                {t("nav.projects")}
            </NavButton>
            <NavButton to="messages">
                <Mail size={32} />
                {t("nav.messages")}
            </NavButton>
            <NavButton to="tickets">
                <Ticket size={32} />
                {t("nav.tickets")}
            </NavButton>
            <NavButton to="account">
                <UserRound size={32} />
                {user?.name}
                {/*{t("nav.account")}*/}
            </NavButton>
            <div className="mt-auto flex gap-2 ">
                <LangButton />
                <ThemeButton />
                <LogoutButton />
            </div>
        </div>
    );
};

export default Nav;
