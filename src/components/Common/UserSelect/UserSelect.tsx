import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import { userType } from "types/userType";
import useOutsideClick from "hooks/useOutsideClick";

import UserSelectMode from "./UserSelectMode";

//Select component
type UserSelectProps = {
    query: (input: string, mode: string) => Promise<userType[]>;
    set: (input: number | null) => void;
    queryKey: string;
};
const UserSelect = ({ set, query, queryKey }: UserSelectProps) => {
    const [expanded, setexpanded] = useState(false);
    const [input, setInput] = useState("");
    const [mode, setmode] = useState<"username" | "email">("username");

    const ref = useOutsideClick(() => setexpanded(false));

    const { data } = useQuery({
        queryKey: ["userSelect", input, mode, queryKey],
        queryFn: () => query(input, mode),
    });
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div
            ref={ref}
            className="grow flex relative flex-col h-[42px] w-full md:w-fit"
        >
            <div className="flex absolute z-20 flex-col w-full Input ">
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
                        onClick={() => setexpanded(true)}
                        placeholder={t("Messages.selectInput")}
                        className="min-w-0 outline-none grow bg-background dark:bg-dbackground w-fit"
                        onChange={(e) => {
                            set(null);
                            setexpanded(true)
                            setInput(e.target.value);
                        }}
                    />
                </div>
                {!data ? null : !expanded ? null : data.length ? (
                    <div className="flex flex-col pt-2">
                        {data.map(
                            (item: {
                                id: number;
                                name: string;
                                email: string;
                            }) => (
                                <button
                                    className="pt-2 px-2 overflow-hidden text-ellipsis border-t text-start border-lightBorder dark:border-dlightBorder"
                                    key={item.id}
                                    onClick={() => {
                                        set(item.id);
                                        setexpanded(false);
                                        if (inputRef.current)
                                            inputRef.current.value =
                                                mode === "email"
                                                    ? item.email
                                                    : item.name;
                                    }}
                                >
                                    {item.name}
                                    <span className="px-2 text-lightBorder dark:text-dlightBorder">
                                        |
                                    </span>
                                    {item.email}
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
