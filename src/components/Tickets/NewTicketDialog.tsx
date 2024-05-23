import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import { apiPostTicketsInputType } from "api/tickets/apiPostTickets";
import { usePostTickets } from "./hooks/usePostTicket";

import { PaperclipIcon, Trash2Icon } from "lucide-react";
import Dialog from "components/Common/Dialog";
import Loader from "components/ui/Loader";
import Input from "components/ui/Input";

type FormFields = { title: string; description: string };

//NewTicketDialog component
const NewTicketDialog = ({ close }: { close: () => void }) => {
    //post ticket
    const { mutate } = usePostTickets();
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
        const newData: apiPostTicketsInputType = {
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
        });
    };

    return (
        <Dialog
            close={close}
            title={t("Tickets.new", { what: t("Tickets.ticket") })}
        >
            <form
                className="flex flex-col gap-2 mt-2 size-full "
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    {...register("title", {
                        required: t("Tickets.titleEmptyError"),
                    })}
                    placeholder={t("Tickets.title")}
                    type="text"
                />
                {errors.title && (
                    <p className="font-medium text-red-600 ps-2">
                        {errors.title.message}
                    </p>
                )}
                <textarea
                    className="resize-none Input grow"
                    placeholder={t("Tickets.description")}
                    {...register("description", {
                        required: t("Tickets.descriptionEmptyError"),
                    })}
                ></textarea>

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
                        {isSubmitting ? <Loader /> : <>{t("Tickets.create",{what:t("Tickets.ticket")})}</>}
                    </button>
                </div>
            </form>
        </Dialog>
    );
};

export default NewTicketDialog;
