import { SubmitHandler, useForm } from "react-hook-form";
import Dialog from "components/Common/Dialog";
import { t } from "i18next";
import Loader from "components/ui/Loader";
import { PaperclipIcon, SendHorizonalIcon } from "lucide-react";
import Select from "../Common/Select/Select";
import { useState } from "react";
import { usePostMessage } from "./usePostMessage";
import Input from "components/ui/Input";
import Textarea from "components/ui/Textarea";

type FormFields = { title: string; content: string };

//NewMessageDialog component
const NewMessageDialog = ({ close }: { close: () => void }) => {
    //handle recepient id and it's errors
    const [recipientId, setrecipientId] = useState<number | null>(null);
    const [toError, settoError] = useState<string | null>(null);

    //post message
    const { mutate } = usePostMessage();

    //handle form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    //form submit funciton
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        //check empty recipientId
        if (!recipientId) {
            settoError(t("Messages.toEmptyError"));
            return;
        }

        //send post request
        return mutate(
            { ...data, receiver_id: recipientId },
            {
                onSuccess: close,
                onError: () => console.log("error"),
            }
        );
    };

    return (
        <Dialog close={close} title={t("Messages.sendTitle")}>
            <Select set={(input) => setrecipientId(input)} />
            {!!toError && !recipientId && (
                <p className="font-medium ps-2 text-red-600 mt-2 ">{toError}</p>
            )}
            <form
                className="size-full flex flex-col mt-2 text-primary dark:text-dprimary gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    {...register("title", {
                        required: t("Messages.titleEmptyError"),
                    })}
                    placeholder={t("Messages.subject")}
                    type="text"
                />
                {errors.title && (
                    <p className="font-medium ps-2 text-red-600 ">
                        {errors.title.message}
                    </p>
                )}
                <Textarea
                    className="Input resize-none grow"
                    placeholder={t("Messages.message")}
                    {...register("content", {
                        required: t("Messages.contentEmptyError"),
                    })}
                />

                {errors.content && (
                    <p className="font-medium ps-2 text-red-600 ">
                        {errors.content.message}
                    </p>
                )}
                <div className="flex gap-2">
                    {/*todo send file*/}
                    <button
                        type="button"
                        className="flex justify-center max-h-16 items-center p-3 mt-5 font-bold rounded-lg bg-primary dark:bg-dprimary text-background dark:text-dbackground "
                        disabled={isSubmitting}
                    >
                        <PaperclipIcon />
                    </button>
                    <button
                        type="submit"
                        className="flex justify-center gap-2 grow max-h-12 items-center p-3 mt-5 font-bold rounded-lg bg-primary dark:bg-dprimary text-background dark:text-dbackground "
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader />
                        ) : (
                            <>
                                {t("Messages.send")}
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
