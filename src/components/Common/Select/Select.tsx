import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { t } from "i18next";
import ModeSelector from "./ModeSelector";
import { apiGetUsers } from "src/api/apiGetUsers";
//Select component
const Select = ({ set }: { set: (input: number) => void }) => {
    const [input, setInput] = useState("");
    const [mode, setmode] = useState<"username" | "email">("username");
    const { data } = useQuery({
        queryKey: ["get user list", input, mode],
        queryFn: () => apiGetUsers(input, mode),
    });
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className="flex relative flex-col h-12">
            <div className="flex absolute flex-col w-full text-primary Input dark:text-dprimary">
                <div className="flex gap-2 items-center">
                    <p>{t("messages.to")}</p>
                    <ModeSelector
                        mode={mode}
                        setMode={() =>
                            setmode((prev) =>
                                prev === "email" ? "username" : "email"
                            )
                        }
                    />
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder={t("messages.selectInput")}
                        className="outline-none grow bg-background dark:bg-dbackground"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                {!data ? null : !input ? null : data.data.data.length ? (
                    <div className="flex flex-col py-2 ">
                        {data.data.data.map(
                            (item: {
                                id: number;
                                name: string;
                                email: string;
                            }) => (
                                <button
                                    className="text-start py-2 border-t border-lightBorder dark:border-dlightBorder px-2"
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
                    <p className="p-2 my-2 border-t border-lightBorder dark:border-dlightBorder ">
                        {t("messages.userNotFound")}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Select;
