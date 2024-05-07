import { SubmitHandler, useForm } from "react-hook-form";
import Dialog from "components/Common/Dialog";
import { t } from "i18next";
import Loader from "components/ui/Loader";
import { PaperclipIcon, SendHorizonalIcon  } from "lucide-react";

type FormFields = { title: string; content: string; recepientId: number };
//NewMessageDialog component
const NewMessageDialog = ({ close }: { close: () => void }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();
    const onSubmit: SubmitHandler<FormFields> = async (data) => {};
    return (
        <Dialog close={close} title={t("messages.sendTitle")}>
            <form
                className="size-full flex flex-col text-primary dark:text-dprimary gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    {...register("recepientId", {
                        required: t("messages.toEmptyError"),
                    })}
                    placeholder={t("messages.to")}
                    className="Input"
                    type="text"
                />
                <input
                    {...register("title", {
                        required: t("messages.titleEmptyError"),
                    })}
                    placeholder={t("messages.subject")}
                    className="Input"
                    type="text"
                />
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
