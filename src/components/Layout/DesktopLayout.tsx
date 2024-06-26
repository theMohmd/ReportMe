import { motion } from "framer-motion";

import Nav from "./Nav/Nav";
import LayoutRoutes from "./LayoutRoutes";
import { useLang } from "src/contexts/Lang/useLang";
//
//DesktopLayout component
const DesktopLayout = () => {
    const { lang } = useLang();
    return (
        <div className="flex">
            <motion.div
                initial={{ opacity: 0, x: lang === "en" ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
            >
                <div className="pt-10 pb-5 w-full font-black text-center border-e border-lightBorder bg-background dark:border-dlightBorder dark:bg-dbackground ">
                    <p dir="ltr" className="text-3xl h-10 flex justify-center items-end">
                        Report<span className="text-dbutton">Me</span>
                    </p>
                </div>
                <Nav />
            </motion.div>
            <div className="flex flex-col overflow-y-auto overflow-x-hidden pt-10 p-5 mx-auto max-w-[1200px] size-full">
                <LayoutRoutes />
            </div>
        </div>
    );
};

export default DesktopLayout;
