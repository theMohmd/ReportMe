import { SubmitHandler, useForm } from "react-hook-form";
import { signUpDataType as FormFields } from "types/signUpDataType";
import { useAuth } from "contexts/Auth/useAuth";
import Loader from "components/ui/Loader";
import { t } from "i18next";
import { motion } from "framer-motion";
import { apiRegister } from "api/apiRegister";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignupForm = () => {
    const { setToken, setUser } = useAuth();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    const [visiblePassword, setvisiblePassword] = useState(false);
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await apiRegister(data);
            setToken(response.data.token);
            setUser({
                email: response.data.user.email,
                name: response.data.user.name,
                id: response.data.user.id,
            });
            navigate("/");
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
            className="flex overflow-y-auto flex-col gap-2 justify-center py-16 px-5 w-full rounded-xl grow bg-background2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex gap-2 [&>input]:grow flex-col sm:flex-row sm:items-center justify-center">
                <p className="flex w-20 font-semibold sm:justify-end">
                    {t("login.username")}
                </p>
                <input
                    {...register("name", {
                        required: t("login.nameEmptyError"),
                    })}
                    className="Input"
                    type="text"
                />
            </div>
            {errors.name && (
                <p className="font-semibold text-red-600 md:px-24">
                    {errors.name.message}
                </p>
            )}
            <div className="flex gap-2 [&>input]:grow flex-col sm:flex-row sm:items-center justify-center">
                <p className="flex w-20 font-semibold sm:justify-end">
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
                <p className="flex w-20 font-semibold sm:justify-end">
                    {t("login.password")}
                </p>
                <input
                    {...register("password", {
                        required: t("login.passwordEmptyError"),

                        minLength: {
                            value: 6,
                            message: t("login.passwrodMinError"),
                        },
                    })}
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
                className="flex justify-center items-center p-3 mt-5 font-bold rounded-lg bg-primary text-background"
                disabled={isSubmitting}
            >
                {isSubmitting ? <Loader size={28} /> : t("login.login")}
            </button>
        </motion.form>
    );
};

export default SignupForm;
