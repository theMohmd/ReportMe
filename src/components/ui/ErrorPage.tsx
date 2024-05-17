import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/contexts/Auth/useAuth";
import { customError } from "src/types/customError";

//Error component
type ErrorPageProps = {
    children?: ReactNode;
    error: customError;
};
const ErrorPage = ({ children, error }: ErrorPageProps) => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    useEffect(() => {
        if (error.response && error.response.status === 401) {
            logOut();
            navigate("/relogin");
        }
        console.log(error)
    });

    return (
        <div className="flex flex-col justify-center items-center pb-48 grow ">
            <p className="relative text-8xl font-black">ERROR</p>
            {children && true}
        </div>
    );
};

export default ErrorPage;
