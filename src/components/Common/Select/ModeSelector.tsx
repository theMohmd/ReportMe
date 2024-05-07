import { AnimatePresence, motion } from "framer-motion";
import { t } from "i18next";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
type ModeSelectorProps = { mode: "email" | "username"; setMode: () => void };
//ModeSelector component
const ModeSelector = ({ mode, setMode }: ModeSelectorProps) => {
    const [expanded, setexpanded] = useState(false);
    return (
        <div className="flex z-20 bg-background dark:bg-dbackground relative flex-col w-28">
            <button
                onClick={() => setexpanded((prev) => !prev)}
                className="flex gap-1 justify-between items-center w-full"
            >
                <p className="relative font-semibold">
                    {mode === "email"
                        ? t("messages.modeEmail")
                        : t("messages.modeUsername")}
                </p>
                <ChevronDownIcon />
            </button>
            <div className="flex absolute end-0 z-10 top-[calc(100%+8px)] w-[calc(100%+8px)] flex-col bg-background dark:bg-dbackground">
                <AnimatePresence>
                    {expanded && (
                        <motion.button
                            initial={{ y: "-50%", opacity: 0 }}
                            animate={{ y: "0", opacity: 1 }}
                            exit={{ y: "-50%", opacity: 0 }}
                            onClick={() => {
                                setMode();
                                setexpanded(false);
                            }}
                            className="flex gap-1 justify-between items-center p-2 rounded-b-xl border-b border-lightBorder dark:border-dlightBorder border-x"
                        >
                            <p className="relative font-semibold">
                                {mode === "username"
                                    ? t("messages.modeEmail")
                                    : t("messages.modeUsername")}
                            </p>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ModeSelector;
