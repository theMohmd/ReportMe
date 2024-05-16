import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Nav from "./Nav/Nav";
import { AnimatePresence, motion } from "framer-motion";
import LayoutRoutes from "./LayoutRoutes";
import { useLocation } from "react-router-dom";

//PhoneLayout component
const PhoneLayout = () => {
    const [navVisibility, setnavVisibility] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Hide nav when URL changes
        setnavVisibility(false);
    }, [location]);
    return (
        <div className="flex flex-col">
            <div className="border-b border-lightBorder dark:border-dlightBorder grid grid-cols-3 items-center justify-center w-full font-black text-center h-[40px] bg-background text-primary text-[20px] dark:bg-dbackground dark:text-dprimary">
                <button
                    className="px-2"
                    onClick={() => setnavVisibility((prev) => !prev)}
                >
                    {navVisibility ? <X /> : <Menu />}
                </button>
                <span>Report<span className="text-dbutton">Me</span></span>
            </div>
            <div className="flex p-2 pt-5 grow overflow-auto">
                <LayoutRoutes />
            </div>
            <AnimatePresence>
                {navVisibility && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute z-[100] backdrop-blur-sm flex w-full h-[calc(100dvh-40px)] top-[40px]"
                    >
                        <div className="flex h-full">
                            <Nav />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PhoneLayout;
