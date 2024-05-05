import { Routes, Route } from "react-router-dom";

//Content component
const Content = () => {
    return (
        <div>
            <Routes>
                <Route path="projects" element={<div>prj</div>}/>
                <Route path="messages" element={<div>msg</div>}/>
                <Route path="tickets" element={<div>tckt</div>}/>
                <Route path="account" element={<div>acc</div>}/>
            </Routes>
        </div>
    );
};

export default Content;
