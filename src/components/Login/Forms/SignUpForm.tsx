import { SubmitHandler, useForm } from "react-hook-form";
import { signUpDataType as FormFields } from "types/signUpDataType";
import { useAuth } from "contexts/Auth/useAuth";
import Loader from "components/ui/Loader";
import { t } from "i18next";
import { motion } from "framer-motion";
import { apiRegister } from "api/apiRegister";

const SignupForm = () => {
    const { setToken, setUser } = useAuth();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await apiRegister(data);
            setToken(response.data.token);
            setUser({
                email: response.data.user.email,
                name: response.data.user.name,
                id: response.data.user.id,
            });
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
            className="flex flex-col gap-2 justify-center py-16 px-5 rounded-xl w-full grow bg-background2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex gap-2 [&>input]:grow items-center justify-center">
                <p className="w-20 font-semibold flex justify-end ">
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
                <p className="md:px-24 font-semibold text-red-600">
                    {errors.name.message}
                </p>
            )}
            <div className="flex gap-2 [&>input]:grow items-center justify-center">
                <p className="w-20 font-semibold flex justify-end ">
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
                <p className="md:px-24 font-semibold text-red-600">
                    {errors.email.message}
                </p>
            )}
            <div className="flex gap-2 [&>input]:grow items-center justify-center">
                <p className="w-20 font-semibold flex justify-end ">
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
                    type="password"
                />
            </div>
            {errors.password && (
                <p className="md:px-24 font-semibold text-red-600">
                    {errors.password.message}
                </p>
            )}
            {errors.root && (
                <p className="md:px-24 font-semibold text-red-600">
                    {errors.root.message}
                </p>
            )}
            <button
                type="submit"
                className="flex justify-center items-center p-3 mt-5 font-bold rounded-lg bg-primary text-background"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <div className="flex items-center w-10 h-7">
                        <Loader />
                    </div>
                ) : (
                    t("login.signup")
                )}
            </button>
        </motion.form>
    );
};

export default SignupForm;
