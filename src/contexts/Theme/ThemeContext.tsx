import { ReactNode, createContext, useEffect, useState } from "react";
import { themeContextType } from "types/theme";
export const ThemeContext = createContext<themeContextType | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>("light");
    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        if (localTheme !== "dark" && localTheme !== "light") return;
        else setTheme(localTheme)

    }, []);

    const changeTheme = () => {
        localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };
    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
