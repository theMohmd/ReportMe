import { t } from "i18next";

import { postProjectType as FormFields } from "api/projects/apiPostProject";
import { usePostProjects } from "./hooks/usePostProject";

import { SubmitHandler, useForm } from "react-hook-form";
import { PaperclipIcon } from "lucide-react";
import Dialog from "components/Common/Dialog";
import Loader from "components/ui/Loader";
import Input from "components/ui/Input";

//NewProjectDialog component
const NewProjectDialog = ({ close }: { close: () => void }) => {
    //post project
    const { mutate } = usePostProjects();

    //handle form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    //form submit funciton
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        //send request
        return mutate(data, {
            onSuccess: close,
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
                        className="flex justify-center max-h-16 items-center p-3 mt-5 font-bold rounded-lg bg-dbutton text-background "
                        disabled={isSubmitting}
                    >
                        <PaperclipIcon />
                    </button>
                    <button
                        type="submit"
                        className="flex justify-center gap-2 grow max-h-12 items-center p-3 mt-5 font-bold rounded-lg bg-dbutton text-background "
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader />
                        ) : (
                            <>
                                {t("Projects.create")}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Dialog>
    );
};

export default NewProjectDialog;
