import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import LangProvider from "contexts/Lang/LangContext";
import ThemeProvider from "./Theme/ThemeContext";
import AuthProvider from "./Auth/AuthContext";

//Providers component for setting all the Providers for project in one seperate file
type ProvidersProps = {
    children: ReactNode;
};
const Providers = ({ children }: ProvidersProps) => {
    return (
        <>
            <AuthProvider>
                <LangProvider>
                    <ThemeProvider>
                        <BrowserRouter>{children}</BrowserRouter>
                    </ThemeProvider>
                </LangProvider>
            </AuthProvider>
        </>
    );
};

export default Providers;
