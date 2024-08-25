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
            <Route path="/ReportMe/" element={<Navigate to="projects" />} />
            <Route path="/ReportMe/reports" element={<Reports />} />
            <Route path="/ReportMe/reports/:user_project_id" element={<ReportsPerProject />} />
            <Route path="/ReportMe/reports/:user_project_id/:id" element={<ReportView/>} />
            <Route path="/ReportMe/projects" element={<Projects />} />
            <Route path="/ReportMe/projects/:id" element={<ProjectView />} />
            <Route path="/ReportMe/messages" element={<Messages />} />
            <Route path="/ReportMe/messages/:id" element={<MessageView />} />
            <Route path="/ReportMe/messages/:id/:reply_id" element={<MessageReplyView />} />
            <Route path="/ReportMe/warnings" element={<Warnings />} />
            <Route path="/ReportMe/warnings/:user_project_id" element={<WarningsPerProject />} />
            <Route path="/ReportMe/warnings/:user_project_id/:id" element={<WarningView/>} />
            <Route path="/ReportMe/tickets" element={<Tickets />} />
            <Route path="/ReportMe/tickets/:id" element={<TicketView />} />
            <Route path="/ReportMe/tickets/:id/:reply_id" element={<TicketReplyView />} />
            <Route path="/ReportMe/account" element={<Account />} />
            <Route path="*" element={<Navigate to="404" />} />
        </Routes>
    );
};

export default LayoutRoutes;
