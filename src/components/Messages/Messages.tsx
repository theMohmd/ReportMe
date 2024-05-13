import { useQuery } from "@tanstack/react-query";
import { apiGetMesseges } from "api/messages/apiGetMesseges";
import MessagesUi from "./MessagesUI";
import Loader from "components/ui/Loader";
import { useState } from "react";
import Error from "../ui/Error";
import { customError } from "src/types/customError";

//Messages component
const Messages = () => {
    const [page, setpage] = useState(1); //todo pagination
    const { data, error, isLoading } = useQuery({
        queryKey: ["Messeges", page],
        queryFn: () => apiGetMesseges({ page: page }),
    });
    if (isLoading)
        return (
            <Loader size={100} className="text-primary dark:text-dprimary" />
        );

    if (error) return <Error error={error as customError} />; //todo

    //todo remove fragment
    return <>{data && <MessagesUi data={data.data.data[0]} />}</>;
};

export default Messages;
