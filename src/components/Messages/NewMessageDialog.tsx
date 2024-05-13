import { SubmitHandler, useForm } from "react-hook-form";
import Dialog from "components/Common/Dialog";
import { t } from "i18next";
import Loader from "components/ui/Loader";
import { PaperclipIcon, SendHorizonalIcon } from "lucide-react";
import { useState } from "react";
import { usePostMessage } from "./usePostMessage";
import Input from "components/ui/Input";
import Textarea from "components/ui/Textarea";
import UserSelect from "components/Common/UserSelect/UserSelect";
import { apiGetUser } from "src/api/login/apiGetUser";
import { apiGetUsers } from "src/api/login/apiGetUsers";

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
            <div className="flex flex-col gap-2 justify-center items-start md:flex-row md:items-center">
                <p className="font-medium ps-2">{t("Messages.to")}</p>
                <UserSelect queryKey="newMessage" query={apiGetUsers} set={(input) => setrecipientId(input)} />
            </div>
            {!!toError && !recipientId && (
                <p className="mt-2 font-medium text-red-600 ps-2">{toError}</p>
            )}
            <form
                className="flex flex-col gap-2 mt-2 size-full text-primary dark:text-dprimary"
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
                    <p className="font-medium text-red-600 ps-2">
                        {errors.title.message}
                    </p>
                )}
                <Textarea
                    className="resize-none Input grow"
                    placeholder={t("Messages.message")}
                    {...register("content", {
                        required: t("Messages.contentEmptyError"),
                    })}
                />

                {errors.content && (
                    <p className="font-medium text-red-600 ps-2">
                        {errors.content.message}
                    </p>
                )}
                <div className="flex gap-2">
                    {/*todo send file*/}
                    <button
                        type="button"
                        className="flex justify-center items-center p-3 mt-5 max-h-16 font-bold rounded-lg bg-primary text-background dark:bg-dprimary dark:text-dbackground"
                        disabled={isSubmitting}
                    >
                        <PaperclipIcon />
                    </button>
                    <button
                        type="submit"
                        className="flex gap-2 justify-center items-center p-3 mt-5 max-h-12 font-bold rounded-lg grow bg-primary text-background dark:bg-dprimary dark:text-dbackground"
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
