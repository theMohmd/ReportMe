import { SubmitHandler, useForm } from "react-hook-form";
import Dialog from "components/Common/Dialog";
import { t } from "i18next";
import Loader from "components/ui/Loader";
import { PaperclipIcon, SendHorizonalIcon } from "lucide-react";
import Select from "../Common/Select/Select";
import { useEffect, useRef, useState } from "react";

type FormFields = { title: string; content: string; to: number };

//NewMessageDialog component
const NewMessageDialog = ({ close }: { close: () => void }) => {
    const [recipientId, setrecipientId] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if (!recipientId)
            setError("to", {
                type: "empty",
                message: t("messages.toEmptyError"),
            });
        console.log({ ...data, recipientId: recipientId });
    };
    return (
        <Dialog close={close} title={t("messages.sendTitle")}>
            <Select set={(input) => setrecipientId(input)} />
            {errors.to && (
                <p className="font-medium ps-2 text-red-600 mt-2 ">
                    {errors.to.message}
                </p>
            )}
            <form
                className="size-full flex flex-col mt-2 text-primary dark:text-dprimary gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    {...register("title", {
                        required: t("messages.titleEmptyError"),
                    })}
                    placeholder={t("messages.subject")}
                    className="Input"
                    type="text"
                />
                {errors.title && (
                    <p className="font-medium ps-2 text-red-600 ">
                        {errors.title.message}
                    </p>
                )}
                <textarea
                    className="Input resize-none grow"
                    placeholder={t("messages.message")}
                    {...register("content")}
                ></textarea>

                <div className="flex gap-2">
                    <button
                        type="button"
                        className="flex justify-center max-h-16 items-center p-3 mt-5 font-bold rounded-lg bg-primary dark:bg-dprimary text-background dark:text-dbackground "
                        disabled={isSubmitting}
                    >
                        <PaperclipIcon />
                    </button>
                    <button
                        type="submit"
                        className="flex justify-center gap-2 grow max-h-16 items-center p-3 mt-5 font-bold rounded-lg bg-primary dark:bg-dprimary text-background dark:text-dbackground "
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader />
                        ) : (
                            <>
                                {t("messages.send")}
                                <SendHorizonalIcon />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Dialog>
    );
};

export default NewMessageDialog;