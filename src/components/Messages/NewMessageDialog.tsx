import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { t } from "i18next";

import { usePostMessage } from "./hooks/usePostMessage";
import { apiGetUsers } from "api/users/apiGetUsers";

import { PaperclipIcon } from "lucide-react";
import Dialog from "components/Common/Dialog";
import Loader from "components/ui/Loader";
import Input from "components/ui/Input";
import Textarea from "components/ui/Textarea";
import UserSelect from "components/Common/UserSelect/UserSelect";

type FormFields = { title: string; content: string };

//NewMessageDialog component
const NewMessageDialog = ({ close }: { close: () => void }) => {
    //handle recepient id and it's errors
    const [recipientId, setrecipientId] = useState<number | null>(null);
    const [toError, settoError] = useState<string | null>(null);

    const navigate = useNavigate();

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
                onSuccess: (res) => {
                    navigate(res.data.data.id.toString());
                },
                onError: () => console.log("error"),
            }
        );
    };

    return (
        <Dialog close={close} title={t("Messages.sendTitle")}>
            <div className="flex flex-col gap-2 justify-center items-start md:flex-row md:items-center">
                <p className="font-medium text-primary dark:text-dprimary ps-2">
                    {t("Messages.to")}
                </p>
                <UserSelect
                    queryKey="newMessage"
                    query={(input, mode) =>
                        apiGetUsers({ input: input, mode: mode })
                    }
                    set={(input) => setrecipientId(input)}
                />
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
                        maxLength: {
                            value: 255,
                            message: t("Messages.titleLongError"),
                        },
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
                        className="flex justify-center max-h-16 items-center p-3 font-bold rounded-lg bg-dbutton text-background "
                        disabled={isSubmitting}
                    >
                        <PaperclipIcon />
                    </button>
                    <button
                        type="submit"
                        className="flex justify-center gap-2 grow max-h-12 items-center p-3 font-bold rounded-lg bg-dbutton text-background "
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader /> : <>{t("Messages.send")}</>}
                    </button>
                </div>
            </form>
        </Dialog>
    );
};

export default NewMessageDialog;
