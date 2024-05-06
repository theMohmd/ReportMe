import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import LangProvider from "contexts/Lang/LangContext";
import ThemeProvider from "./Theme/ThemeContext";
import AuthProvider from "./Auth/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

//Providers component for setting all the Providers for project in one seperate file
type ProvidersProps = {
    children: ReactNode;
};
const Providers = ({ children }: ProvidersProps) => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <LangProvider>
                        <ThemeProvider>
                            <BrowserRouter>{children}</BrowserRouter>
                        </ThemeProvider>
                    </LangProvider>
                </AuthProvider>
            </QueryClientProvider>
        </>
    );
};

export default Providers;
