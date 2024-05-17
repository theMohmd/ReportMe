import { motion } from "framer-motion";
import { ReactNode } from "react";
import { parentStaggerVariants } from "src/utils/motionVariants";
//List component
type ListProps = {
    children: ReactNode;
};
const List = ({ children }: ListProps) => {
    return (
        <motion.div
            variants={parentStaggerVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-2 size-full"
        >
            {children}
        </motion.div>
    );
};

export default List;
