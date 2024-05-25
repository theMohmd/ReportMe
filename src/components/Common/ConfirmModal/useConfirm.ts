import { useContext } from "react";
import {
    ConfirmModalContext,
    ConfirmModalContextType,
} from "./ConfirmModalContext";

export const useConfirm = () => {
    return useContext(ConfirmModalContext) as ConfirmModalContextType;
};
