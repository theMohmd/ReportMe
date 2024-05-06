//LangButton component
import { useLang } from "contexts/Lang/useLang";
import { Languages } from "lucide-react";
import SmallButton from "./SmallButton";
const LangButton = () => {
    const { setLang } = useLang();
    return (
        <SmallButton onClick={() => setLang()}>
            <Languages size={32} />
        </SmallButton>
    );
};

export default LangButton;
