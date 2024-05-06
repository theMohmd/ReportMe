import { useEffect, useState } from "react";
import DesktopLayout from "components/Layouts/DesktopLayout";
import PhoneLayout from "components/Layouts/PhoneLayout";
import { useLang } from "contexts/Lang/useLang";
import { useTheme } from "contexts/Theme/useTheme";
import { useAuth } from "contexts/Auth/useAuth";
import Login from "components/Login/Login";
import axios from "axios";
import Loader from "components/ui/Loader";
import { useGetUser } from "./hooks/useGetUser";

const App = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
    const { theme } = useTheme();
    const { lang } = useLang();
    const { user, token } = useAuth();
    const { isLoading } = useGetUser();

    useEffect(() => {
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization = "Bearer " + token;
            return config;
        });
    }, [token]);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div
            dir={lang == "fa" ? "rtl" : "ltr"}
            className={`${theme ? "dark" : null}
            bg-background2 dark:bg-dbackground2 flex overflow-hidden h-dvh w-screen [&>*]:grow `}
        >
            {isLoading ? (
                <div className="text-primary size-full p-96">
                    <Loader />
                </div>
            ) : !user ? (
                <Login />
            ) : isLargeScreen ? (
                <DesktopLayout />
            ) : (
                <PhoneLayout />
            )}
        </div>
    );
};
export default App;
