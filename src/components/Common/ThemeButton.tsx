import { SunMoon } from "lucide-react";
import { useTheme } from "contexts/Theme/useTheme";
import SmallButton from "components/ui/SmallButton";

//ThemeButton component
const ThemeButton = () => {
    const { settheme } = useTheme();
    return (
        <SmallButton onClick={() => settheme((prev) => !prev)}>
            <SunMoon size={32} />
        </SmallButton>
    );
};

export default ThemeButton;