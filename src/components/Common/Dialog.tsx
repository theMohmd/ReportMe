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
            className="flex overflow-hidden absolute top-0 left-0 z-50 justify-center p-5 bg-black bg-opacity-75 md:p-10 h-dvh w-dvw backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex flex-col p-5 rounded-xl border bg-background2 grow max-w-[1200px] border-lightBorder dark:border-dlightBorder dark:bg-dbackground2"
            >
                <div className="grid justify-center items-center mb-5 grid-cols-[32px_1fr_32px]">
                    <p className="col-start-2 justify-self-center text-xl font-semibold text-primary dark:text-dprimary">{title}</p>
                    <button onClick={close} className="col-start-3 justify-self-end w-fit">
                        <XIcon
                            className="text-primary dark:text-dprimary"
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
