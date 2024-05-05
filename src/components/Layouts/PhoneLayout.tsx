import { Menu } from "lucide-react";
import { useState } from "react";
import Nav from "./Nav/Nav";
import { AnimatePresence, motion } from "framer-motion";
import Content from "./Content";

//PhoneLayout component
const PhoneLayout = () => {
    const [navVisibility, setnavVisibility] = useState(false);
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-3 items-center py-2 w-full font-black text-center h-[60px] bg-background text-primary text-[24px] dark:bg-dbackground dark:text-dprimary">
                <button onClick={() => setnavVisibility((prev) => !prev)}>
                    <Menu size={40} className="mr-2" />
                </button>
                ReportMe
            </div>
            <div className=" grow">
                <Content />
            </div>
            <AnimatePresence>
                {navVisibility && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute backdrop-blur-lg flex w-full h-[calc(100dvh-60px)] top-[60px]"
                    >
                        <div className="h-full flex  ">
                            <Nav />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PhoneLayout;
