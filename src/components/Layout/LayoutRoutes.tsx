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

//Routes for layout component
const LayoutRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="projects" />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reports/:user_project_id" element={<ReportsPerProject />} />
            <Route path="reports/:user_project_id/:id" element={<ReportView/>} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectView />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:id" element={<MessageView />} />
            <Route path="messages/:id/:reply_id" element={<MessageReplyView />} />
            <Route path="warnings" element={<Warnings />} />
            <Route path="warnings/:user_project_id" element={<WarningsPerProject />} />
            <Route path="warnings/:user_project_id/:id" element={<WarningView/>} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="tickets/:id" element={<TicketView />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<Navigate to="404" />} /> 
        </Routes>
    );
};

export default LayoutRoutes;
