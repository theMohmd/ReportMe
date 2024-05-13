import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { t } from "i18next";
import UserSelectMode from "./UserSelectMode";
import { userType } from "src/types/auth";
//Select component
type UserSelectProps = {
    query: (input: string, mode: string) => Promise<userType[]>;
    set: (input: number | null) => void;
    queryKey: string;
};
const UserSelect = ({ set, query, queryKey }: UserSelectProps) => {
    const [input, setInput] = useState("");
    const [mode, setmode] = useState<"username" | "email">("username");
    
    const { data } = useQuery({
        queryKey: ["get user list", input, mode, queryKey],
        queryFn: () => query(input, mode),
    });
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className=" grow flex relative flex-col h-10 w-full md:w-fit">
            <div className="flex absolute z-20 flex-col w-full text-primary Input dark:text-dprimary">
                <div className="flex gap-2 items-center flex-row">
                    <div className="flex gap-2 items-center">
                        <UserSelectMode
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
                        placeholder={t("Messages.selectInput")}
                        className="min-w-0 outline-none grow bg-background dark:bg-dbackground w-fit"
                        onChange={(e) => {
                            set(null);
                            setInput(e.target.value);
                        }}
                    />
                </div>
                {!data ? null : !input ? null : data
                      .length ? (
                    <div className="flex flex-col py-2">
                        {data.map(
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
                        {t("Messages.userNotFound")}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserSelect;
