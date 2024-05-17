import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import { usePostReports } from "./hooks/usePostReports";
import { apiPostReportsInputType } from "api/reports/apiPostReports";

import Dialog from "components/Common/Dialog";
import Loader from "components/ui/Loader";
import { PaperclipIcon, Trash2Icon } from "lucide-react";
import { useRef, useState } from "react";

type FormFields = { description: string };

//NewReportDialog component
type NewReportDialogProps = { close: () => void; user_project_id: number };
const NewReportDialog = ({ close, user_project_id }: NewReportDialogProps) => {
    const [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    //post report
    const { mutate } = usePostReports();

    const navigate = useNavigate();

    //handle form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    //form submit funciton
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        //create input data
        const newData: apiPostReportsInputType = {
            ...data,
            user_project_id: user_project_id,
            file: undefined,
        };

        //add file if exists
        if (file) newData.file = file;

        //send request
        return mutate(
            newData,
            {
                onSuccess: (res) => {
                    navigate(res.id.toString());
                },
                onError: () => console.log("error"),
            }
        );
    };

    return (
        <Dialog close={close} title={t("Reports.newReport")}>
            <form
                className="size-full flex flex-col mt-2 gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <textarea
                    className="Input resize-none grow"
                    placeholder={t("Reports.report")}
                    {...register("description", {
                        required: t("Reports.descriptionEmptyError"),
                    })}
                ></textarea>

                {errors.description && (
                    <p className="font-medium ps-2 text-red-600 ">
                        {errors.description.message}
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
                                    className="relative overflow-hidden line-clamp-1 text-ellipsis top-[2px]"
                                >
                                    {file.name}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                    <button
                        type="submit"
                        className="flex justify-center gap-2 grow max-h-12 items-center p-3 font-bold rounded-lg bg-dbutton text-background "
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader /> : <>{t("Reports.create")}</>}
                    </button>
                </div>
            </form>
        </Dialog>
    );
};

export default NewReportDialog;
