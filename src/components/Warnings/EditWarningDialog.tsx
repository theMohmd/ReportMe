import { t } from "i18next";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import { usePatchWarning } from "./hooks/usePatchWarning";
import { apiPatchWarningsInputType } from "api/warnings/apiPatchWarnings";

import { PaperclipIcon, Trash2Icon } from "lucide-react";
import Dialog from "components/Common/Dialog";
import Loader from "components/ui/Loader";
import Textarea from "components/ui/Textarea";
import { warningType } from "src/types/warningType";

type FormFields = {
    title: string;
    description: string;
};
//EditWarningDialog component
type EditWarningDialogProps = { close: () => void; data: warningType };
const EditWarningDialog = ({ close, data }: EditWarningDialogProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileDeleted, setFileDeleted] = useState(false);
    const fileRef = useRef<HTMLInputElement | null>(null);

    //patch warning
    const { mutate } = usePatchWarning();

    //handle form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    //form submit funciton
    const onSubmit: SubmitHandler<FormFields> = async (formData) => {
        //create input data
        const newData: apiPatchWarningsInputType = {
            id: data.id,
            description: undefined,
            file: fileDeleted ? "" : undefined,
        };

        //add description if exists
        if (formData.description) newData.description = formData.description;

        //add file if exists
        if (file) newData.file = file;

        //send patch request
        return mutate(newData, {
            onSuccess: () => {
                close();
            },
            onError: () => console.log("error"),
        });
    };

    return (
        <Dialog close={close} title={t("Warnings.sendTitle")}>
            <form
                className="flex flex-col gap-2 mt-2 size-full "
                onSubmit={handleSubmit(onSubmit)}
            >
                <Textarea
                    className="resize-none Input grow"
                    placeholder={
                        t("Warnings.warning") + ": " + data.description
                    }
                    {...register("description")}
                />

                {errors.description && (
                    <p className="font-medium text-red-600 ps-2">
                        {errors.description.message}
                    </p>
                )}
                <div className="flex flex-col gap-2 md:flex-row">
                    <button
                        type="button"
                        className="md:max-w-[50%] flex justify-center gap-2 items-center p-3 max-h-16 font-bold rounded-lg bg-background dark:bg-dbackground border border-lightBorder dark:border-dlightBorder "
                        disabled={isSubmitting}
                        onClick={() => {
                            if (file || (data.file && !fileDeleted)) {
                                setFileDeleted(true);
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
                        {file || (data.file && !fileDeleted) ? (
                            <Trash2Icon />
                        ) : (
                            <PaperclipIcon />
                        )}
                        <AnimatePresence>
                            {(file || (data.file && !fileDeleted)) && (
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: 200 }}
                                    exit={{ width: 0 }}
                                    className="overflow-hidden relative line-clamp-1 text-ellipsis top-[2px]"
                                >
                                    {data.file && !fileDeleted
                                        ? "file"
                                        : file?.name}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                    <button
                        type="submit"
                        className="flex gap-2 justify-center items-center p-3 max-h-12 font-bold rounded-lg grow bg-dbutton text-background"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader />
                        ) : (
                            <>{t("Warnings.create")}</>
                        )}
                    </button>
                </div>
            </form>
        </Dialog>
    );
};

export default EditWarningDialog;
