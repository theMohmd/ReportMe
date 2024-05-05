import { ReactNode, createContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { langContextType, langType } from "types/lang";

export const LangContext = createContext<langContextType | null>(null);

const LangProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setlang] = useState<langType>("fa");
    const { i18n } = useTranslation();
    const setLang = (lang: langType) => {
        i18n.changeLanguage(lang);
        setlang(lang);
    };
    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
};

export default LangProvider;
