import { SubmitHandler, useForm } from "react-hook-form";
import Dialog from "components/Common/Dialog";
import { t } from "i18next";
import Loader from "components/ui/Loader";
import { PaperclipIcon, SendHorizonalIcon } from "lucide-react";
import Input from "components/ui/Input";
import { usePostReports } from "./hooks/usePostReports";
import { postReportType as FormFields } from "src/api/reports/apiPostReports";

type NewReportDialogProps = { close: () => void; user_project_id: number };
//NewReportDialog component
const NewReportDialog = ({ close, user_project_id }: NewReportDialogProps) => {
    //post report
    const { mutate } = usePostReports();

    //handle form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    //form submit funciton
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        //send request
        return mutate(
            { ...data, user_project_id: user_project_id },
            {
                onSuccess:(data)=>{console.log(data); close()},
                onError: () => console.log("error"),
            }
        );
    };

    return (
        <Dialog close={close} title={t("Reports.newReport")}>
            <form
                className="size-full flex flex-col mt-2 text-primary dark:text-dprimary gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    {...register("title", {
                        required: t("Reports.titleEmptyError"),
                    })}
                    placeholder={t("Reports.title")}
                    type="text"
                />
                {errors.title && (
                    <p className="font-medium ps-2 text-red-600 ">
                        {errors.title.message}
                    </p>
                )}
                <textarea
                    className="Input resize-none grow"
                    placeholder={t("Reports.description")}
                    {...register("description", {
                        required: t("Reports.descriptionEmptyError"),
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
                                {t("Reports.create")}
                                <SendHorizonalIcon />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Dialog>
    );
};

export default NewReportDialog;
