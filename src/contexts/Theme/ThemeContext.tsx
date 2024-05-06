import { ReactNode, createContext, useState } from "react";
import { themeContextType } from "types/theme";
export const ThemeContext = createContext<themeContextType | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, settheme] = useState<boolean>(false); //true: dark, false: light
    return (
        <ThemeContext.Provider value={{ theme, settheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
