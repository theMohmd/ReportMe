import { createContext, useState, ReactNode } from "react";
export type ConfirmModalContextType = {
    displayed: boolean;
    confirmModal: (action: () => void) => void;
    action: () => void;
    close: () => void;
};

export const ConfirmModalContext =
    createContext<ConfirmModalContextType | null>(null);

const ConfirmModalProvider = ({ children }: { children: ReactNode }) => {
    const [displayed, setdisplayed] = useState(false);
    const [action, setAction] = useState<() => void>(() => () => {});
    const close = () => setdisplayed(false);
    const confirmModal = (action: () => void) => {
        setdisplayed(true);
        setAction(()=>action);
    };
    return (
        <ConfirmModalContext.Provider
            value={{ displayed, confirmModal, action, close }}
        >
            {children}
        </ConfirmModalContext.Provider>
    );
};

export default ConfirmModalProvider;
