import { SunMoon } from "lucide-react";
import { useTheme } from "contexts/Theme/useTheme";
import SmallButton from "components/ui/SmallButton";

//ThemeButton component
const ThemeButton = () => {
    const { changeTheme } = useTheme();
    return (
        <SmallButton onClick={changeTheme}>
            <SunMoon size={32} />
        </SmallButton>
    );
};

export default ThemeButton;
