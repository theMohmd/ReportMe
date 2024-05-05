import { useEffect, useState } from "react";
import DesktopLayout from "components/Layouts/DesktopLayout";
import PhoneLayout from "components/Layouts/PhoneLayout";

const App = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

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
        <div dir="rtl" className="flex overflow-hidden h-dvh w-screen [&>*]:grow ">
            {isLargeScreen ? <DesktopLayout /> : <PhoneLayout />}
        </div>
    );
};
export default App;
