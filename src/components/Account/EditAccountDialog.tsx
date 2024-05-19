import { t } from "i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { usePatchAccount } from "./hooks/usePatchAccount";

import Dialog from "components/Common/Dialog";
import Loader from "components/ui/Loader";
import Input from "components/ui/Input";
import { apiAuthUpdateInputType as FormFields } from "src/api/auth/apiAuthUpdate";
import { useAuth } from "src/contexts/Auth/useAuth";

//EditAccountDialog component
type EditAccountDialogProps = { close: () => void };
const EditAccountDialog = ({ close }: EditAccountDialogProps) => {
    const { user } = useAuth();

    //patch account
    const { mutate } = usePatchAccount();

    //handle form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    //form submit funciton
    const onSubmit: SubmitHandler<FormFields> = async (formData) => {
        //send patch request
        return mutate(formData, {
            onSuccess: () => {
                close();
            },
            onError: () => console.log("error"),
        });
    };

    return (
        <Dialog close={close} title={t("Account.editTitle")}>
            <motion.form
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
                exit={{ opacity: 0 }}
                className="flex overflow-y-auto flex-col gap-2 justify-center w-full grow"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex gap-2 [&>input]:grow flex-col sm:flex-row sm:items-center justify-center">
                    <Input
                        placeholder={t("login.username") + " : " + user?.name}
                        className="grow"
                        {...register("name")}
                        type="text"
                    />
                </div>
                {errors.name && (
                    <p className="font-semibold text-red-600 md:px-24">
                        {errors.name.message}
                    </p>
                )}
                <div className="flex gap-2 [&>input]:grow flex-col sm:flex-row sm:items-center justify-center">
                    <Input
                    placeholder={t("login.email") +" : " + user?.email}
                        className="grow"
                        {...register("email", {
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
                <div className="flex relative flex-col gap-2 justify-center sm:flex-row sm:items-center">
                    <Input
                    placeholder={t("login.password") }
                        className="grow"
                        {...register("password", {
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
                    {isSubmitting ? <Loader /> : t("Account.submit")}
                </button>
            </motion.form>
        </Dialog>
    );
};

export default EditAccountDialog;
