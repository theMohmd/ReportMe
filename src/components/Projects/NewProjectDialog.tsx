import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import { apiPostProjectsInputType } from "api/projects/apiPostProjects";
import { usePostProjects } from "./hooks/usePostProject";

import { PaperclipIcon, Trash2Icon } from "lucide-react";
import Dialog from "components/Common/Dialog";
import Loader from "components/ui/Loader";
import Input from "components/ui/Input";

type FormFields = { title: string; description: string };

//NewProjectDialog component
const NewProjectDialog = ({ close }: { close: () => void }) => {
    //post project
    const { mutate } = usePostProjects();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    //handle form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    //form submit funciton
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        //create input data
        const newData: apiPostProjectsInputType = {
            ...data,
            file: undefined,
        };

        //add file if exists
        if (file) newData.file = file;

        //send request
        return mutate(newData, {
            onSuccess: (res) => {
                navigate(res.id.toString());
            },
            onError: () => console.log("error"),
        });
    };

    return (
        <Dialog close={close} title={t("Projects.newProject")}>
            <form
                className="size-full flex flex-col mt-2 text-primary dark:text-dprimary gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    {...register("title", {
                        required: t("Projects.titleEmptyError"),
                    })}
                    placeholder={t("Projects.title")}
                    type="text"
                />
                {errors.title && (
                    <p className="font-medium ps-2 text-red-600 ">
                        {errors.title.message}
                    </p>
                )}
                <textarea
                    className="Input resize-none grow"
                    placeholder={t("Projects.description")}
                    {...register("description", {
                        required: t("Projects.descriptionEmptyError"),
                    })}
                ></textarea>

                {errors.description && (
                    <p className="font-medium ps-2 text-red-600 ">
                        {errors.description.message}
                    </p>
                )}
                <div className="flex gap-2">
                    {/*todo send file*/}
                    <button
                        type="button"
                        className="flex justify-center max-h-16 items-center p-3 font-bold rounded-lg bg-dbutton text-background "
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
                                    animate={{ width: 200, maxWidth: "50%" }}
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
                        {isSubmitting ? (
                            <Loader />
                        ) : (
                            <>{t("Projects.create")}</>
                        )}
                    </button>
                </div>
            </form>
        </Dialog>
    );
};

export default NewProjectDialog;
