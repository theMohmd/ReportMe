import { t } from "i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAuth } from "contexts/Auth/useAuth";
import {
  apiRegister,
  apiRegisterOutputType,
  apiRegisterInputType as FormFields,
} from "api/auth/apiRegister";

import Loader from "components/ui/Loader";
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
    apiRegister(data)
      .then((res: apiRegisterOutputType) => {
        setToken(res.token);
        setUser(res.user);
        navigate("/reportme");
      })
      .catch(() => {
        setError("root", {
          type: "422",
          message: t("login.signupError"),
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
      <div className="flex relative flex-col gap-2 justify-center sm:flex-row sm:items-center">
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
        className="flex justify-center items-center p-3 mt-5 max-h-12 font-bold rounded-lg bg-dbutton text-background"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader /> : t("login.signup")}
      </button>
    </motion.form>
  );
};

export default SignupForm;
