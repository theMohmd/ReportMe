import { t } from "i18next";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import { usePatchMessage } from "./hooks/usePatchMessage";
import { apiPatchMessagesInputType } from "api/messages/apiPatchMessages";

import { PaperclipIcon, Trash2Icon } from "lucide-react";
import Dialog from "components/Common/Dialog";
import Loader from "components/ui/Loader";
import Input from "components/ui/Input";
import Textarea from "components/ui/Textarea";
import { messageType } from "src/types/messageType";

type FormFields = {
    title: string;
    content: string;
};
//EditMessageDialog component
type EditMessageDialogProps = { close: () => void; data: messageType };
const EditMessageDialog = ({ close, data }: EditMessageDialogProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileDeleted, setFileDeleted] = useState(false);
    const fileRef = useRef<HTMLInputElement | null>(null);

    //patch message
    const { mutate } = usePatchMessage();

    //handle form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    //form submit funciton
    const onSubmit: SubmitHandler<FormFields> = async (formData) => {
        //create input data
        const newData: apiPatchMessagesInputType = {
            id: data.id,
            title: undefined,
            content: undefined,
            file: fileDeleted ? "": undefined,
        };
        //add title if exists
        if (formData.title) newData.title = formData.title;

        //add content if exists
        if (formData.content) newData.content = formData.content;

        //add file if exists
        if (file) newData.file = file

        //send patch request
        return mutate(newData, {
            onSuccess: () => {
                close();
            },
            onError: () => console.log("error"),
        });
    };

    return (
        <Dialog close={close} title={t("Messages.sendTitle")}>
            <form
                className="flex flex-col gap-2 mt-2 size-full "
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    placeholder={t("Messages.subject") + ": " + data.title}
                    {...register("title", {
                        maxLength: {
                            value: 255,
                            message: t("Messages.titleLongError"),
                        },
                    })}
                    type="text"
                />
                {errors.title && (
                    <p className="font-medium text-red-600 ps-2">
                        {errors.title.message}
                    </p>
                )}
                <Textarea
                    className="resize-none Input grow"
                    placeholder={t("Messages.message") + ": " + data.content}
                    {...register("content")}
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
                            if (file || (data.file && !fileDeleted)) {
                                setFileDeleted(true)
                                setFile(null);
                            } else fileRef.current?.click();
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
                        {file || (data.file && !fileDeleted) ? <Trash2Icon /> : <PaperclipIcon />}
                        <AnimatePresence>
                            {(file || (data.file && !fileDeleted)) && (
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: 200 }}
                                    exit={{ width: 0 }}
                                    className="overflow-hidden relative line-clamp-1 text-ellipsis top-[2px]"
                                >
                                    {data.file && !fileDeleted ? "file" : file?.name}
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

export default EditMessageDialog;
