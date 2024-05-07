import { SubmitHandler, useForm } from "react-hook-form";
import { loginDataType as FormFields } from "types/loginDataType";
import Loader from "components/ui/Loader";
import { t } from "i18next";
import { motion } from "framer-motion";
import { apiLogin } from "api/apiLogin";
import { useAuth } from "contexts/Auth/useAuth";
import { apiGetUser } from "api/apiGetUser";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    const { setToken, setUser } = useAuth();
    const navigate = useNavigate();
    const [visiblePassword, setvisiblePassword] = useState(false);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await apiLogin(data);
            setToken(response.data.token);
            await apiGetUser()
                .then((res) => {
                    setUser({
                        email: res.data.user.email,
                        name: res.data.user.name,
                        id: res.data.user.id,
                    });
                })
                .then(() => navigate("/"));
        } catch (error) {
            console.error(error);
            setError("root", {
                type: "400",
                message: t("login.credentialError"),
            });
        }
    };
    return (
        <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            className=" text-primary dark:text-dprimary flex flex-col gap-2 justify-center overflow-y-auto py-16 px-5 size-full rounded-xl grow bg-background2 dark:bg-dbackground2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex gap-2 [&>input]:grow flex-col sm:flex-row sm:items-center justify-center">
                <p className="flex sm:justify-end w-20 font-semibold">
                    {t("login.email")}
                </p>
                <input
                    {...register("email", {
                        required: t("login.emailEmptyError"),
                        pattern: {
                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                            message: t("login.emailValidError"),
                        },
                    })}
                    value={"test@mail.com"} //todo delete
                    className="Input"
                    type="email"
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
                <input
                    {...register("password", {
                        required: t("login.passwordEmptyError"),
                        minLength: {
                            value: 6,
                            message: t("login.passwordMinError"),
                        },
                    })}
                    value={"password"} //todo delete
                    className="Input"
                    type={visiblePassword ? "text" : "password"}
                />
                <button
                    type="button"
                    className="absolute end-2 top-2 text-primary"
                    onClick={() => setvisiblePassword((prev) => !prev)}
                >
                    {visiblePassword ? <EyeOff /> : <Eye />}
                </button>
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
                className="flex justify-center max-h-12 items-center p-3 text-base mt-5 font-bold rounded-lg bg-primary dark:bg-dprimary text-background dark:text-dbackground "
                disabled={isSubmitting}
            >
                {isSubmitting ? <Loader /> : t("login.login")}
            </button>
        </motion.form>
    );
};

export default LoginForm;
