import { t } from "i18next";
import { useState } from "react";
import LoginForm from "./Forms/LoginForm";
import SignupForm from "./Forms/SignUpForm";
import LangButton from "../ui/LangButton";
import { AnimatePresence } from "framer-motion";

//Login component
const Login = () => {
    const [mode, setmode] = useState<"login" | "signup">("login");
    return (
        <div className="flex flex-col justify-center items-center p-5 bg-background2">
            <p className="p-5 text-5xl font-black text-primary">ReportMe</p>
            <div className="flex flex-col items-center p-5 rounded-3xl bg-primary size-full max-h-[600px] max-w-[800px]">
                <p className="p-5 text-3xl font-bold text-background">
                    {mode === "login" ? t("login.login") : t("login.signup")}
                </p>
                <AnimatePresence>
                    {mode === "login" ? <LoginForm /> : <SignupForm />}
                </AnimatePresence>
                <div className="flex">
                    <p className="text-center text-background p-2 mt-2">
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
                        className="text-center font-bold text-background p-2 mt-2"
                    >
                        {mode === "login" ? t("login.signup") : t("login.login")}
                    </button>
                </div>
            </div>
            <div className="absolute right-5 top-5">
                <LangButton />
            </div>
        </div>
    );
};

export default Login;
