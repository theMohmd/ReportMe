import { useQuery } from "@tanstack/react-query";
import { apiGetMesseges } from "api/messages/apiGetMesseges";
import MessagesUi from "./MessagesUI";
import Loader from "components/ui/Loader";
import { useState } from "react";
import { customError } from "src/types/customError";
import ErrorPage from "../ui/ErrorPage";

//Messages component
const Messages = () => {
    const [page, setpage] = useState(0);
    const { data, error, isLoading } = useQuery({
        queryKey: ["Messages", page],
        queryFn: () => apiGetMesseges({ page: page + 1 }),
    });
    if (isLoading)
        return (
            <Loader size={100} className="text-primary dark:text-dprimary" />
        );
    if (error) return <ErrorPage error={error as customError} />; //todo
    return (
        data && (
            <MessagesUi
                setPage={(input: number) => setpage(input)}
                page={page}
                data={data.data.data[0]}
            />
        )
    );
};

export default Messages;
