import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { t } from "i18next";
import ModeSelector from "./ModeSelector";
import { apiGetUsers } from "api/login/apiGetUsers";
//Select component
const Select = ({ set }: { set: (input: number|null) => void }) => {
    const [input, setInput] = useState("");
    const [mode, setmode] = useState<"username" | "email">("username");
    const { data } = useQuery({
        queryKey: ["get user list", input, mode],
        queryFn: () => apiGetUsers(input, mode),
    });
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className="flex relative flex-col h-[104px] md:h-12">
            <div className="flex absolute z-20 flex-col w-full text-primary Input dark:text-dprimary">
                <div className="flex gap-2 md:items-center items-start flex-col md:flex-row">
                    <div className="flex gap-2 items-center">
                        <p className="min-w-12">{t("messages.to")}</p>
                        <ModeSelector
                            mode={mode}
                            setMode={() =>
                                setmode((prev) =>
                                    prev === "email" ? "username" : "email"
                                )
                            }
                        />
                    </div>
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder={t("messages.selectInput")}
                        className="min-w-0 outline-none grow bg-background dark:bg-dbackground border-t border-lightBorder dark:border-dlightBorder md:border-none pt-2 md:p-0 w-full md:w-fit"
                        onChange={(e) => {set(null);setInput(e.target.value)}}
                    />
                </div>
                {!data ? null : !input ? null : data.data.data.length ? (
                    <div className="flex flex-col py-2">
                        {data.data.data.map(
                            (item: {
                                id: number;
                                name: string;
                                email: string;
                            }) => (
                                <button
                                    className="py-2 px-2 overflow-hidden text-ellipsis border-t text-start border-lightBorder dark:border-dlightBorder"
                                    key={item.id}
                                    onClick={() => {
                                        set(item.id);
                                        setInput("");
                                        if (inputRef.current)
                                            inputRef.current.value = item.name;
                                    }}
                                >
                                    {item.name} | {item.email}
                                </button>
                            )
                        )}
                    </div>
                ) : (
                    <p className="p-2 my-2 border-t border-lightBorder dark:border-dlightBorder">
                        {t("messages.userNotFound")}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Select;
