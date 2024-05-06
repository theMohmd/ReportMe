import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "contexts/Auth/useAuth";
import { loginDataType as FormFields } from "src/types/loginDataType";
import { Loader } from "lucide-react";
const LoginForm = () => {
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        auth?.loginAction(data);
    };
    return (
        <form
            className="flex flex-col gap-2 py-16 px-5 rounded-md "
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                {...register("email", {
                    required: "ایمیل نمی‌تواند خالی باشد",
                    pattern: {
                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                        message: "ایمیل معتبر نیست",
                    },
                })}
                className="Input"
                type="text"
                placeholder="ایمیل"
            />
            {errors.email && (
                <p className="text-red-700 text-right">
                    {errors.email.message}
                </p>
            )}
            <input
                {...register("password", {
                    required: "کلمه عبور نمی‌تواند خالی باشد",
                    minLength: {
                        value: 8,
                        message: "کلمه عبور حداقل باید ۸ کاراکتر داشته باشد",
                    },
                })}
                className="Input"
                type="password"
                placeholder="کلمه عبور"
            />
            {errors.password && (
                <p className="text-red-700 text-right">
                    {errors.password.message}
                </p>
            )}
            <button
                type="submit"
                className="Button mt-2"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <div className="flex items-center w-10 h-7">
                        <Loader />
                    </div>
                ) : (
                    "ورود"
                )}
            </button>
        </form>
    );
};

export default LoginForm;
