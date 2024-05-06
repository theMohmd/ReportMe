import { SunMoon } from "lucide-react";
import { useTheme } from "src/contexts/Theme/useTheme";

//ThemeButton component
const ThemeButton = () => {
    const {settheme} = useTheme()
    return (
        <button
            onClick={() => {
                settheme((prev) => !prev);
            }}
            className="flex justify-center items-center bg-primary dark:bg-dprimary text-background dark:text-dbackground size-10 rounded-lg "
        >
            <SunMoon size={32} />
        </button>
    );
};

export default ThemeButton;
