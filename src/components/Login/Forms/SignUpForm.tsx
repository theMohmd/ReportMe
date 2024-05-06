import { SubmitHandler, useForm } from "react-hook-form";
import { signupDataType as FormFields } from "types/signUpDataType";
import { useAuth } from "contexts/Auth/useAuth";
import { Loader } from "lucide-react";

const SignupForm = () => {
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();
    const onSubmit: SubmitHandler<FormFields> = (data) => {
        auth?.signUpActon(data);
    };
    return (
        <form
            className="flex flex-col border border-primary gap-2 px-5 py-16 bg-white rounded-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                {...register("name", {
                    required: "نام کاربری نمی‌تواند خالی باشد",
                })}
                className="Input"
                type="text"
                placeholder="نام کاربری"
            />
            {errors.name && (
                <p className="text-red-700 text-right">{errors.name.message}</p>
            )}
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
                placeholder="کلمه‌عبور"
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
                    "ثبت‌نام"
                )}
            </button>
        </form>
    );
};

export default SignupForm;
