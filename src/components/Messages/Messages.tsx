import { useQuery } from "@tanstack/react-query";
import { apiGetMesseges } from "api/messages/apiGetMesseges";
import MessagesUi from "./MessagesUI";
import Loader from "components/ui/Loader";
import { useState } from "react";

//Messages component
const Messages = () => {
    const [page, setpage] = useState(1); //todo pagination
    const { data, error, isLoading } = useQuery({
        queryKey: ["Messeges", page],
        queryFn: () => apiGetMesseges({ page: page }),
    });
    if (isLoading)
        return (
            <Loader size={100} className=" text-primary dark:text-dprimary " />
        );
    if (error) return <div>error</div>; //todo
    //todo remove fragment
    return <>{data && <MessagesUi data={data.data.data} />}</>;
};

export default Messages;
