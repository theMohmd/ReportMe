//Textarea component
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
}
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ name, ...rest }, ref) => {
        return (
            <textarea
                {...rest}
                name={name}
                ref={ref}
                className="p-2 min-w-0 rounded-lg border outline-none resize-none grow bg-background border-lightBorder dark:bg-dbackground dark:border-dlightBorder"
            />
        );
    }
);

export default Textarea;
