import { ReactNode } from "react";
import { Link } from "react-router-dom";

//Error component
type ErrorProps = {
    children ?: ReactNode
};
const Error = ({ children } : ErrorProps) => {
    return (
        <div className="flex flex-col justify-center items-center pb-48 grow text-primary ">
            <p className="relative text-8xl font-black">ERROR</p>
            {children && true}
        </div>
    );
};

export default Error;
