import { Routes, Route, Navigate } from "react-router-dom";
import Projects from "components/Projects/Projects";
import Tickets from "components/Tickets/Tickets";
import Account from "components/Account/Account";
import Messages from "components/Messages/Messages";
import MessageView from "../Messages/MessageView";

//Routes for layout component
const LayoutRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="projects" />} />
            <Route path="projects" element={<Projects />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:id" element={<MessageView />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<Navigate to="404" />} />
        </Routes>
    );
};

export default LayoutRoutes;
