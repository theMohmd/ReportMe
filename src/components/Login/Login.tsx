import { useState } from "react";
import LoginForm from "components/Login/Forms/LoginForm";
import SignupForm from "components/Login/Forms/SignUpForm";
import { motion } from "framer-motion";

const Login = () => {
    const [mode, setmode] = useState<"signup" | "login">("login");
    return (
        <div className="grid justify-center items-center bg-primary">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    backgroundSize: "50% auto",
                }}
                className="grid p-2 rounded-xl md:p-4 bg-background2 h-[600px] w-[800px]"
            >
                <div className="flex overflow-hidden flex-col md:flex-row">
                    <div
                        className={`grid duration-200 overflow-y-auto overflow-x-hidden order-2 md:mb-0 ${
                            mode === "login"
                                ? "h-4/5 md:w-2/3 md:h-full"
                                : "h-0 md:w-0 md:h-full"
                        }  `}
                    >
                        <LoginForm />
                    </div>
                    <div className="flex flex-col order-1 gap-2 justify-center h-1/3 md:order-3 md:mx-5 md:w-1/3 md:h-full">
                        <p className="text-center text-primary dark:text-dprimary text-xl">
                            {mode === "signup"
                                ? "قبلا حساب ساخته اید؟"
                                : "هنوز حساب نساخته اید؟"}
                        </p>
                        <button
                            onClick={() =>
                                setmode((prev) => {
                                    if (prev === "signup") return "login";
                                    else return "signup";
                                })
                            }
                            className=" dark:!bg-dprimary bg-primary text-background dark:text-dbackground font-bold flex items-center justify-center rounded-lg p-2 "
                        >
                            {mode === "signup" ? "ورود" : "ثبت‌نام"}
                        </button>
                    </div>
                    <div
                        className={`grid duration-200 overflow-y-auto overflow-x-hidden order-4  ${
                            mode === "signup"
                                ? "h-4/5 md:w-2/3 md:h-full"
                                : "h-0 md:w-0 md:h-full"
                        }  `}
                    >
                        <SignupForm />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
