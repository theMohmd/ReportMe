import { useQuery } from "@tanstack/react-query";
import { apiGetMesseges } from "src/api/apiGetMesseges";
import MessagesUi from "./MessagesUI";
import Loader from "components/ui/Loader";

//Messages component
const Messages = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["Messeges"],
        queryFn: apiGetMesseges,
    });
    if (isLoading)
        return (
            <Loader size={100} className=" text-primary dark:text-dprimary " />
        );

    if (data) return <MessagesUi data={data.data.data} />;
    return <div>error</div>;//todo
};

export default Messages;
