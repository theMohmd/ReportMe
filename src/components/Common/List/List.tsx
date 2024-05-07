import { ReactNode } from "react";

//List component
type ListProps = {
    children: ReactNode;
};
const List = ({ children }: ListProps) => {
    return <div className="flex flex-col gap-2 size-full">{children}</div>;
};

export default List;
