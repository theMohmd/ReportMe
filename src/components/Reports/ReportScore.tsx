import { AnimatePresence, motion } from "framer-motion";
import { t } from "i18next";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useMutationScore } from "./hooks/useMutationScore";

//ReportScore component
type ReportScoreProps = { id: number };
const ReportScore = ({ id }: ReportScoreProps) => {
    const [input, setinput] = useState(-1);
    const [expanded, setexpanded] = useState(false);
    const { mutate } = useMutationScore();
    const submit = () => {
        if (input === -1) return;
        mutate({ report: id, score: input });
    };
    return (
        <div
            onClick={() => setexpanded(true)}
            className="flex overflow-hidden gap-2 justify-center items-center p-1 font-bold rounded-lg cursor-pointer bg-dbutton text-background hover:shadow-cshadow"
        >
            <p className="py-1 px-3">{t("Reports.score")}</p>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        className="flex gap-1"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "10rem", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setexpanded(false);
                            }}
                        >
                            <XIcon />
                        </button>
                        <input
                            className="px-2 w-0 h-full rounded-md outline-none grow bg-background remove-arrow dark:bg-dbackground"
                            name="score"
                            type="number"
                            onChange={(e) => setinput(parseInt(e.target.value))}
                        />
                        <button onClick={submit}>
                            <CheckIcon />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReportScore;
