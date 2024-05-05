import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

//Providers component for setting all the Providers for project in one seperate file
type ProvidersProps = {
    children: ReactNode;
};
const Providers = ({ children }: ProvidersProps) => {
    return (
        <>
            <BrowserRouter>{children}</BrowserRouter>
        </>
    );
};

export default Providers;
