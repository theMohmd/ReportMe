import { SubmitHandler, useForm } from "react-hook-form";
import { loginDataType as FormFields } from "types/loginDataType";
import Loader from "components/ui/Loader";
import { t } from "i18next";
import { motion } from "framer-motion";
import { apiLogin } from "api/apiLogin";
import { useAuth } from "contexts/Auth/useAuth";
import { apiGetUser } from "api/apiGetUser";
const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    const { _setToken, setUser } = useAuth();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await apiLogin(data);
            _setToken(response.data.token);
            await apiGetUser().then((res) => {
                setUser({
                    email: res.data.user.email,
                    name: res.data.user.name,
                    id: res.data.user.id,
                });
            });
        } catch (error) {
            console.error(error)
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
            className="flex flex-col gap-2 justify-center py-16 px-5 rounded-xl grow w-full bg-background2"
            onSubmit={handleSubmit(onSubmit)}
        >
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
                    value={"test@mail.com"} //todo delete
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
                            message: t("login.passwordMinError"),
                        },
                    })}
                    value={"password"} //todo delete
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
                className="flex justify-center items-center p-3 mt-5 font-bold rounded-lg bg-primary text-background "
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <div className="flex items-center w-10 h-7">
                        <Loader />
                    </div>
                ) : (
                    t("login.login")
                )}
            </button>
        </motion.form>
    );
};

export default LoginForm;
