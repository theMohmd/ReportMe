import { Routes, Route, Navigate } from "react-router-dom";
import Projects from "components/Projects/Projects";
import Tickets from "components/Tickets/Tickets";
import Account from "components/Account/Account";
import Messages from "components/Messages/Messages";
import MessageView from "components/Messages/MessageView";
import ProjectView from "components/Projects/ProjectView";
import Reports from "components/Reports/Reports";
import ReportView from "components/Reports/ReportView";
import ReportsPerProject from "../Reports/ReportsPerProject";
import TicketView from "../Tickets/TicketView";
import WarningView from "../Warnings/WarningView";
import WarningsPerProject from "../Warnings/WarningsPerProject";
import Warnings from "../Warnings/Warnings";
import MessageReplyView from "../Messages/MessageReplyView";
import TicketReplyView from "../Tickets/TicketReplyView";

//Routes for layout component
const LayoutRoutes = () => {
    return (
        <Routes>
            <Route path="/reportme/" element={<Navigate to="projects" />} />
            <Route path="/reportme/reports" element={<Reports />} />
            <Route path="/reportme/reports/:user_project_id" element={<ReportsPerProject />} />
            <Route path="/reportme/reports/:user_project_id/:id" element={<ReportView/>} />
            <Route path="/reportme/projects" element={<Projects />} />
            <Route path="/reportme/projects/:id" element={<ProjectView />} />
            <Route path="/reportme/messages" element={<Messages />} />
            <Route path="/reportme/messages/:id" element={<MessageView />} />
            <Route path="/reportme/messages/:id/:reply_id" element={<MessageReplyView />} />
            <Route path="/reportme/warnings" element={<Warnings />} />
            <Route path="/reportme/warnings/:user_project_id" element={<WarningsPerProject />} />
            <Route path="/reportme/warnings/:user_project_id/:id" element={<WarningView/>} />
            <Route path="/reportme/tickets" element={<Tickets />} />
            <Route path="/reportme/tickets/:id" element={<TicketView />} />
            <Route path="/reportme/tickets/:id/:reply_id" element={<TicketReplyView />} />
            <Route path="/reportme/account" element={<Account />} />
            <Route path="*" element={<Navigate to="404" />} />
        </Routes>
    );
};

export default LayoutRoutes;
