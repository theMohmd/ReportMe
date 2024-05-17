import { langType } from "src/types/lang";

export const scaleVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
};

export const parentStaggerVariants = {
    animate: {
        transition: {
            staggerChildren: 0.1, // Stagger animation by 0.1 seconds between children
        },
    },
};
export const slideVariants = (lang: langType) => {
    return {
        initial: { opacity: 0, x: lang === "fa" ? 20 : -20 },
        animate: { opacity: 1, x: 0 },
    };
};
