import Loader from "../ui/Loader";
import ErrorPage from "../ui/ErrorPage";
import { customError } from "src/types/customError";
import MessageRepliesUi from "./MessageRepliesUi";
import { useGetMessageReplies } from "./hooks/useGetMessageReplies";

//MessageReplies component
type MessageRepliesProps = {
    messageId: number;
};
const MessageReplies = ({ messageId }: MessageRepliesProps) => {
    const { page, setPage, data, isLoading, error } =
        useGetMessageReplies(messageId);
    if (isLoading) return <Loader size={40} />;
    if (error) return <ErrorPage error={error as customError} />;
    console.log(data);
    return (
        data && <MessageRepliesUi data={data} page={page} setPage={setPage} />
    );
};

export default MessageReplies;
