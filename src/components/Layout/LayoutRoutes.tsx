import { Routes, Route, Navigate } from "react-router-dom";
import Projects from "components/Projects/Projects";
import Tickets from "components/Tickets/Tickets";
import Account from "components/Account/Account";
import Messages from "components/Messages/Messages";
import MessageView from "components/Messages/MessageView";
import ProjectView from "components/Projects/ProjectView";
import Reports from "components/Reports/Reports";
import ReportView from "components/Reports/ReportView";

//Routes for layout component
const LayoutRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="projects" />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reports/:id" element={<ReportView />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectView />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:id" element={<MessageView />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="account" element={<Account />} />
            {/*<Route path="*" element={<Navigate to="404" />} /> todo*/}
        </Routes>
    );
};

export default LayoutRoutes;
