import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import { PaperclipIcon, Trash2Icon } from "lucide-react";
import Dialog from "components/Common/Dialog";
import Loader from "components/ui/Loader";
import Textarea from "components/ui/Textarea";
import { usePostReply } from "./hooks/usePostReply";
import { apiPostTicketRepliesInputType } from "src/api/tickets/ticket-replies/apiPostTicketReplies";

type FormFields = {
  content: string;
};
//NewReplyDialog component
const NewReplyDialog = ({
  close,
  ticketId,
}: {
  ticketId: number;
  close: () => void;
}) => {
  //handle recepient id and it's errors

  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  //post reply
  const { mutate } = usePostReply();

  //handle form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  //form submit funciton
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //create input data
    const newData: apiPostTicketRepliesInputType = {
      ...data,
      ticket_id: ticketId,
      file: undefined,
    };

    //add file if exists
    if (file) newData.file = file;

    //send post request
    return mutate(newData, {
      onSuccess: (res) => {
        navigate(res.id.toString());
      },
    });
  };

  return (
    <Dialog
      close={close}
      title={t("Tickets.new", { what: t("Tickets.reply") })}
    >
      <form
        className="flex flex-col gap-2 mt-2 size-full "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Textarea
          className="resize-none Input grow"
          placeholder={t("Tickets.reply")}
          {...register("content", {
            required: t("Tickets.contentEmptyError"),
          })}
        />

        {errors.content && (
          <p className="font-medium text-red-600 ps-2">
            {errors.content.message}
          </p>
        )}
        <div className="flex flex-col gap-2 md:flex-row">
          {/******************************************************************************
                    file inpu
                    ******************************************************************************/}
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
                setFile(e.target.files ? e.target.files[0] : null)
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
          {/******************************************************************************
                    submit button
                    ******************************************************************************/}
          <button
            type="submit"
            className="flex gap-2 justify-center items-center p-3 max-h-12 font-bold rounded-lg grow bg-dbutton text-background"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader /> : <>{t("Tickets.send")}</>}
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default NewReplyDialog;
