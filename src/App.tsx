import { useEffect, useState } from "react";
import DesktopLayout from "components/Layouts/DesktopLayout";
import PhoneLayout from "components/Layouts/PhoneLayout";
import { useLang } from "contexts/Lang/useLang";
import { useTheme } from "contexts/Theme/useTheme";

const App = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
    const { theme } = useTheme();
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
