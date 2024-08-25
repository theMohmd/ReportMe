import NavButton from "./NavButton";
import {
    ClipboardPenIcon,
    FolderGit2Icon,
    MailIcon,
    // TicketIcon,
    // TriangleAlertIcon,
    UserRoundIcon,
} from "lucide-react";
import LangButton from "components/Common/LangButton";
import ThemeButton from "components/Common/ThemeButton";
import LogoutButton from "components/Common/LogoutButton";
import { t } from "i18next";
//
//Nav component
const Nav = () => {
    return (
        <div className="flex flex-col gap-2 p-2 border-e border-lightBorder dark:border-dlightBorder grow w-[200px] bg-background dark:bg-dbackground">
            <NavButton to="reportme/reports">
                <ClipboardPenIcon />
                {t("nav.reports")}
            </NavButton>
            <NavButton to="reportme/projects">
                <FolderGit2Icon />
                {t("nav.projects")}
            </NavButton>
            <NavButton to="reportme/messages">
                <MailIcon />
                {t("nav.messages")}
            </NavButton>
            {/*todo:
            <NavButton to="tickets">
                <TicketIcon />
                {t("nav.tickets")}
            </NavButton>
            <NavButton to="warnings">
                <TriangleAlertIcon />
                {t("nav.warnings")}
            </NavButton>
              */}
            <NavButton to="reportme/account">
                <UserRoundIcon />
                {t("nav.account")}
            </NavButton>
            <div className="mt-auto mb-3 flex gap-1 justify-start ">
                <LangButton />
                <ThemeButton />
                <LogoutButton />
            </div>
        </div>
    );
};

export default Nav;
