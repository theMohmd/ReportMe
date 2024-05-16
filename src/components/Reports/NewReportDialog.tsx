import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { usePostReports } from "./hooks/usePostReports";
import { apiPostReportsInputType as FormFields } from "api/reports/apiPostReports";

import Dialog from "components/Common/Dialog";
import Loader from "components/ui/Loader";
import { PaperclipIcon } from "lucide-react";

//NewReportDialog component
type NewReportDialogProps = { close: () => void; user_project_id: number };
const NewReportDialog = ({ close, user_project_id }: NewReportDialogProps) => {
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
        //send request
        return mutate(
            { description: data.description, user_project_id: user_project_id },
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
                className="size-full flex flex-col mt-2 text-primary dark:text-dprimary gap-2"
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
                        {isSubmitting ? <Loader /> : <>{t("Reports.create")}</>}
                    </button>
                </div>
            </form>
        </Dialog>
    );
};

export default NewReportDialog;
