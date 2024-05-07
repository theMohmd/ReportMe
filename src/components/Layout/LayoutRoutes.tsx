import { Routes, Route, Navigate } from "react-router-dom";
import Projects from "components/Projects/Projects";
import Messeges from "components/Messeges/Messeges";
import Tickets from "components/Tickets/Tickets";
import Account from "components/Account/Account";

//Routes for layout component
const LayoutRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="projects" />} />
                <Route path="projects" element={<Projects />} />
                <Route path="messages" element={<Messeges />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="account" element={<Account />} />
                <Route path="*" element={<Navigate to="404" />} />
            </Routes>
        </div>
    );
};

export default LayoutRoutes;
