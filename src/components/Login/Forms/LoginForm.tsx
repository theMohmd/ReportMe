import { t } from "i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import {
    apiLogin,
    apiLoginOutputType,
    apiLoginInputType as FormFields,
} from "api/auth/apiLogin";
import { useAuth } from "contexts/Auth/useAuth";

import Input from "components/ui/Input";
import Loader from "components/ui/Loader";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    const { setToken, setUser } = useAuth();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        apiLogin(data)
            .then((res: apiLoginOutputType) => {
                setToken(res.token);
                setUser(res.user);
                navigate("/ReportMe/");
            })
            .catch(() => {
                setError("root", {
                    type: "400",
                    message: t("login.credentialError"),
                });
            });
    };
    return (
        <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            className="flex overflow-y-auto flex-col gap-2 justify-center w-full grow"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex gap-2 flex-col sm:flex-row sm:items-center justify-center">
                <p className="flex sm:justify-end w-20 font-semibold">
                    {t("login.email")}
                </p>
                <Input
                    className="grow"
                    {...register("email", {
                        required: t("login.emailEmptyError"),
                        pattern: {
                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                            message: t("login.emailValidError"),
                        },
                    })}
                    type="text"
                />
            </div>
            {errors.email && (
                <p className="font-semibold text-red-600 md:px-24">
                    {errors.email.message}
                </p>
            )}
            <div className="flex gap-2 relative [&>input]:grow flex-col sm:flex-row sm:items-center justify-center">
                <p className="flex sm:justify-end w-20 font-semibold">
                    {t("login.password")}
                </p>
                <Input
                    className="grow"
                    {...register("password", {
                        required: t("login.passwordEmptyError"),
                        minLength: {
                            value: 6,
                            message: t("login.passwordMinError"),
                        },
                    })}
                    type="password"
                />
            </div>
            {errors.password && (
                <p className="font-semibold text-red-600 md:px-24">
                    {errors.password.message}
                </p>
            )}
            {errors.root && (
                <p className="font-semibold text-red-600 md:px-24">
                    {errors.root.message}
                </p>
            )}
            <button
                type="submit"
                className="flex justify-center max-h-12 items-center p-3 text-base mt-5 font-bold rounded-lg bg-dbutton text-background "
                disabled={isSubmitting}
            >
                {isSubmitting ? <Loader /> : t("login.login")}
            </button>
        </motion.form>
    );
};

export default LoginForm;
