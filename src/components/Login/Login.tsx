import { t } from "i18next";
import { useState } from "react";
import LoginForm from "./Forms/LoginForm";
import SignupForm from "./Forms/SignUpForm";
import LangButton from "components/Common/LangButton";
import { AnimatePresence } from "framer-motion";

//Login component
const Login = () => {
    const [mode, setmode] = useState<"login" | "signup">("login");
    return (
        <div className="flex flex-col justify-center overflow-y-auto items-center p-5 bg-background2 dark:bg-dbackground2 ">
            <p className="p-5 text-5xl font-black text-primary dark:text-dprimary ">Report<span className="text-dbutton">Me</span></p>
            <div className="flex flex-col items-center w-full max-h-[600px] max-w-[800px]">
                <AnimatePresence>
                    {mode === "login" ? <LoginForm /> : <SignupForm />}
                </AnimatePresence>
                <div className="flex">
                    <p className="p-2 mt-2 text-center text-primary dark:text-dprimary ">
                        {mode === "login"
                            ? t("login.signupQuestion")
                            : t("login.loginQuestion")}
                    </p>
                    <button
                        onClick={() =>
                            setmode((prev) =>
                                prev === "login" ? "signup" : "login"
                            )
                        }
                        className="p-2 mt-2 font-bold text-center dark:text-dprimary text-primary "
                    >
                        {mode === "login"
                            ? t("login.signup")
                            : t("login.login")}
                    </button>
                </div>
            </div>
            <div className="absolute top-5 right-5">
                <LangButton />
            </div>
        </div>
    );
};

export default Login;
