import { useQuery } from "@tanstack/react-query";
import { apiGetMesseges } from "src/api/apiGetMesseges";
import MessagesUi from "./MessagesUI";
import Loader from "components/ui/Loader";

//Messages component
const Messages = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["Messeges"],
        queryFn: apiGetMesseges,
    });
    console.log(data)
    if (error) return <div>error</div>;
    if (isLoading) return <Loader size={100} className=" text-primary dark:text-dprimary " />;

    return <MessagesUi />;
};

export default Messages;
