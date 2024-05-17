import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import { apiGetUsers } from "api/users/apiGetUsers";
import { usePostMessage } from "./hooks/usePostMessage";
import { apiPostMessageInputType } from "api/messages/apiPostMessages";

import { PaperclipIcon, Trash2Icon } from "lucide-react";
import Dialog from "components/Common/Dialog";
import Loader from "components/ui/Loader";
import Input from "components/ui/Input";
import Textarea from "components/ui/Textarea";
import UserSelect from "components/Common/UserSelect/UserSelect";

type FormFields = {
    title: string;
    content: string;
};
//NewMessageDialog component
const NewMessageDialog = ({ close }: { close: () => void }) => {
    //handle recepient id and it's errors
    const [recipientId, setrecipientId] = useState<number | null>(null);
    const [toError, settoError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const navigate = useNavigate();
    const fileRef = useRef<HTMLInputElement | null>(null);

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

        //create input data
        const newData: apiPostMessageInputType = {
            ...data,
            receiver_id: recipientId,
            file: undefined,
        };

        //add file if exists
        if (file) newData.file = file;

        //send post request
        return mutate(newData, {
            onSuccess: (res) => {
                navigate(res.id.toString());
            },
            onError: () => console.log("error"),
        });
    };

    return (
        <Dialog close={close} title={t("Messages.sendTitle")}>
            <div className="flex flex-col gap-2 justify-center items-start md:flex-row md:items-center">
                <p className="font-medium ps-2 ">{t("Messages.sendTo")}</p>
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
                className="flex flex-col gap-2 mt-2 size-full "
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
                <div className="flex flex-col gap-2 md:flex-row">
                    <button
                        type="button"
                        className="md:max-w-[50%] flex justify-center gap-2 items-center p-3 max-h-16 font-bold rounded-lg bg-background dark:bg-dbackground border border-lightBorder dark:border-dlightBorder "
                        disabled={isSubmitting}
                        onClick={() => {
                            if (file) setFile(null);
                            else fileRef.current?.click();
                        }}
                    >
                        <input
                            className="hidden"
                            type="file"
                            ref={fileRef}
                            onChange={(e) =>
                                setFile(
                                    e.target.files ? e.target.files[0] : null
                                )
                            }
                        />
                        {file ? <Trash2Icon /> : <PaperclipIcon />}
                        <AnimatePresence>
                            {file && (
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: 200 }}
                                    exit={{ width: 0 }}
                                    className="overflow-hidden relative line-clamp-1 text-ellipsis top-[2px]"
                                >
                                    {file.name}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                    <button
                        type="submit"
                        className="flex gap-2 justify-center items-center p-3 max-h-12 font-bold rounded-lg grow bg-dbutton text-background"
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
