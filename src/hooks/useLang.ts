import { useContext } from "react";
import { langContextType } from "types/lang";
import { LangContext } from "contexts/LangContext";

export const useLang = () => useContext(LangContext) as langContextType;
