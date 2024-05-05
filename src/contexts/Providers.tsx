import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import LangProvider from "contexts/LangContext";

//Providers component for setting all the Providers for project in one seperate file
type ProvidersProps = {
    children: ReactNode;
};
const Providers = ({ children }: ProvidersProps) => {
    return (
        <>
            <LangProvider>
                <BrowserRouter>{children}</BrowserRouter>
            </LangProvider>
        </>
    );
};

export default Providers;
