//LangButton component
import { useLang } from "contexts/Lang/useLang";
import { Languages } from "lucide-react";
const LangButton = () => {
    const { setLang } = useLang();
    return (
        <button
            onClick={() => {
                setLang();
            }}
            className="flex justify-center items-center bg-primary dark:bg-dprimary text-background dark:text-dbackground size-10 rounded-lg "
        >
            <Languages size={32} />
        </button>
    );
};

export default LangButton;
