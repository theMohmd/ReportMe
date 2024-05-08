//LangButton component
import { useLang } from "contexts/Lang/useLang";
import { Languages } from "lucide-react";
import CustomButton from "components/ui/CustomButton";
const LangButton = () => {
    const { setLang } = useLang();
    return (
        <CustomButton onClick={() => setLang()}>
            <Languages size={32} />
        </CustomButton>
    );
};

export default LangButton;
