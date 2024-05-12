//Input component
import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, forwardRef, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ name, type, className, ...rest }, ref) => {
        const [visiblePassword, setvisiblePassword] = useState(false);
        return (
            <div className={"relative flex " + className}>
                <input
                    {...rest}
                    name={name}
                    ref={ref}
                    type={
                        type === "password"
                            ? visiblePassword
                                ? "text"
                                : "password"
                            : type
                    }
                    className="p-2 min-w-0 grow rounded-lg border outline-none bg-background border-lightBorder dark:bg-dbackground dark:border-dlightBorder"
                />
                {type === "password" && (
                    <button
                        type="button"
                        className="absolute end-2 top-2 text-primary dark:text-dprimary "
                        onClick={() => setvisiblePassword((prev) => !prev)}
                    >
                        {visiblePassword ? <EyeOff /> : <Eye />}
                    </button>
                )}
            </div>
        );
    }
);

export default Input;
