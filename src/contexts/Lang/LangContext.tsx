import { ReactNode, createContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { langContextType, langType } from "types/lang";

export const LangContext = createContext<langContextType | null>(null);

const LangProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setlang] = useState<langType>("fa");
    const { i18n } = useTranslation();
    const setLang = () => {
        const l = lang === "fa" ? "en" : "fa";
        i18n.changeLanguage(l);
        setlang(l);
    };
    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
};

export default LangProvider;
