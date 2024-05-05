import { useState } from "react";

//PhoneLayout component
const PhoneLayout = () => {
    const [navVisibility, setnavVisibility] = useState(false);
    return (
        <div className="flex overflow-hidden flex-col w-screen h-dvh">
            <div className="bg-red-500 h-[60px]">
                <button onClick={() => setnavVisibility((prev) => !prev)}>
                    click
                </button>
            </div>
            <div className="bg-violet-500 grow"></div>
            {navVisibility && (
                <div className="absolute bg-green-500 w-full h-[calc(100dvh-60px)] top-[60px]"></div>
            )}
        </div>
    );
};

export default PhoneLayout;
