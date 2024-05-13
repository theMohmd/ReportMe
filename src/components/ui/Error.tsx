import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customError } from "src/types/customError";

//Error component
type ErrorProps = {
    children?: ReactNode;
    error: customError;
};
const Error = ({ children, error }: ErrorProps) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (error.response.status === 401) navigate("/relogin");
    } );

    return (
        <div className="flex flex-col justify-center items-center pb-48 grow text-primary ">
            <p className="relative text-8xl font-black">ERROR</p>
            {children && true}
        </div>
    );
};

export default Error;
