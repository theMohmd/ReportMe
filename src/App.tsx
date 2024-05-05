import { useContext, useEffect, useState } from "react";
import DesktopLayout from "components/Layouts/DesktopLayout";
import PhoneLayout from "components/Layouts/PhoneLayout";
import { ThemeContext } from "contexts/Theme/ThemeContext";
import { themeContextType } from "types/theme";
import { useLang } from "./hooks/useLang";

const App = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
    const { theme } = useContext(ThemeContext) as themeContextType;
    const { lang } = useLang();

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
            {isLargeScreen ? <DesktopLayout /> : <PhoneLayout />}
        </div>
    );
};
export default App;
