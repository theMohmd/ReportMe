import MessagesUi from "./MessagesUI";
import Loader from "components/ui/Loader";
import { customError } from "src/types/customError";
import ErrorPage from "../ui/ErrorPage";
import { useQueryGetMessages } from "./hooks/useQueryGetMessages";

//Messages component
const Messages = () => {
    const { data, error, isLoading, page, setpage } = useQueryGetMessages();
    if (isLoading) return <Loader size={100} />;
    if (error) return <ErrorPage error={error as customError} />;
    return (
        data && (
            <MessagesUi
                setPage={(input: number) => setpage(input)}
                page={page}
                data={data}
            />
        )
    );
};

export default Messages;
