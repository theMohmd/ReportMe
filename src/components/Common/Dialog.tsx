import { ReactNode } from "react";
import { XIcon } from "lucide-react";
import { motion } from "framer-motion";
//Dialog component
type DialogProps = {
    children: ReactNode;
    title?:string;
    close: () => void;
};
const Dialog = ({ children, title, close }: DialogProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex absolute bg-black bg-opacity-75 top-0 left-0 justify-center p-5 md:p-10 h-dvh w-dvw backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="rounded-xl p-5 flex flex-col border bg-background2 grow max-w-[1200px] border-lightBorder dark:border-dlightBorder dark:bg-dbackground2"
            >
                <div className="grid grid-cols-3 items-center justify-center mb-5">
                    <p className="justify-self-center col-start-2 text-xl text-primary dark:text-dprimary font-semibold ">{title}</p>
                    <button onClick={close} className="w-fit col-start-3 justify-self-end">
                        <XIcon
                            className="text-primary dark:text-dprimary "
                            size={32}
                        />
                    </button>
                </div>
                {children}
            </motion.div>
        </motion.div>
    );
};

export default Dialog;
