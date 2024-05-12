import { SubmitHandler, useForm } from "react-hook-form";
import { signUpDataType as FormFields } from "types/signUpDataType";
import { useAuth } from "contexts/Auth/useAuth";
import Loader from "components/ui/Loader";
import { t } from "i18next";
import { motion } from "framer-motion";
import { apiRegister } from "api/login/apiRegister";
import { useNavigate } from "react-router-dom";
import Input from "components/ui/Input";

const SignupForm = () => {
    const { setToken, setUser } = useAuth();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

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
            console.log(error);
            setError("root", {
                type: "422",
                message: t("login.signupError"),
            });
        }
    };
    return (
        <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            className=" text-primary dark:text-dprimary flex overflow-y-auto flex-col gap-2 justify-center py-16 px-5 w-full rounded-xl grow bg-background2 dark:bg-dbackground2 "
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex gap-2 [&>input]:grow flex-col sm:flex-row sm:items-center justify-center">
                <p className="flex w-20 font-semibold sm:justify-end">
                    {t("login.username")}
                </p>
                <Input
                    className="grow"
                    {...register("name", {
                        required: t("login.nameEmptyError"),
                    })}
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
                <Input
                    className="grow"
                    {...register("email", {
                        required: t("login.emailEmptyError"),
                        pattern: {
                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                            message: t("login.emailValidError"),
                        },
                    })}
                    type="email"
                />
            </div>
            {errors.email && (
                <p className="font-semibold text-red-600 md:px-24">
                    {errors.email.message}
                </p>
            )}
            <div className="flex gap-2 relative flex-col sm:flex-row sm:items-center justify-center">
                <p className="flex w-20 font-semibold sm:justify-end">
                    {t("login.password")}
                </p>
                <Input
                    className="grow"
                    {...register("password", {
                        required: t("login.passwordEmptyError"),

                        minLength: {
                            value: 6,
                            message: t("login.passwrodMinError"),
                        },
                    })}
                    type= "password"
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
                className="flex justify-center max-h-12 items-center p-3 mt-5 font-bold rounded-lg bg-primary dark:bg-dprimary text-background dark:text-dbackground "
                disabled={isSubmitting}
            >
                {isSubmitting ? <Loader /> : t("login.signup")}
            </button>
        </motion.form>
    );
};

export default SignupForm;
