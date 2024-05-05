import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { themeContextType } from "src/types/theme";

export const useTheme = () => useContext(ThemeContext) as themeContextType;
