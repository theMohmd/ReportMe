import { Routes, Route, Navigate } from "react-router-dom";

//Routes for layout component
const LayoutRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<div>prj</div>} />
                <Route path="projects" element={<div>prj</div>} />
                <Route path="messages" element={<div>msg</div>} />
                <Route path="tickets" element={<div>tckt</div>} />
                <Route path="account" element={<div>acc</div>} />
                <Route path="*" element={<Navigate to="404" />} />
            </Routes>
        </div>
    );
};

export default LayoutRoutes;
