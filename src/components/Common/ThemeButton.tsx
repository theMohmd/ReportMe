import { SunMoon } from "lucide-react";
import { useTheme } from "contexts/Theme/useTheme";
import CustomButton from "components/ui/CustomButton";

//ThemeButton component
const ThemeButton = () => {
    const { changeTheme } = useTheme();
    return (
        <CustomButton onClick={changeTheme}>
            <SunMoon />
        </CustomButton>
    );
};

export default ThemeButton;
