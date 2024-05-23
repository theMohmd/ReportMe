import Loader from "../ui/Loader";
import ErrorPage from "../ui/ErrorPage";
import { customError } from "src/types/customError";
import TicketRepliesUi from "./TicketRepliesUi";
import { useGetTicketReplies } from "./hooks/useGetTicketReplies";

//TicketReplies component
type TicketRepliesProps = {
    ticketId: number;
};
const TicketReplies = ({ ticketId }: TicketRepliesProps) => {
    const { page, setPage, data, isLoading, error } =
        useGetTicketReplies(ticketId);
    if (isLoading) return <Loader size={40} />;
    if (error) return <ErrorPage error={error as customError} />;
    return (
        data && <TicketRepliesUi data={data} page={page} setPage={setPage} />
    );
};

export default TicketReplies;
