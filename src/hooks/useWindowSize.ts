import { useEffect, useState } from "react";

export const useWindowSize = (size:number) => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > size);
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > size);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [size]);
    return isLargeScreen;
};
