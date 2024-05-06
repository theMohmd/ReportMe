import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Providers from "./contexts/Providers.tsx";
import "./i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
        <Providers>
            <App />
        </Providers>
);
