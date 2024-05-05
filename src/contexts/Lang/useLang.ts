import { useContext } from "react";
import { LangContext } from "./LangContext";
import { langContextType } from "types/lang";

export const useLang = () => useContext(LangContext) as langContextType;
