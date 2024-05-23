import TicketsUi from "./TicketsUI";
import Loader from "components/ui/Loader";
import { customError } from "src/types/customError";
import ErrorPage from "../ui/ErrorPage";
import { useQueryGetTickets } from "./hooks/useQueryGetTickets";

//Tickets component
const Tickets = () => {
    const { data, error, isLoading, page, setpage } = useQueryGetTickets();
    if (isLoading) return <Loader size={100} />;
    if (error) return <ErrorPage error={error as customError} />;
    return (
        data && (
            <TicketsUi
                setPage={(input: number) => setpage(input)}
                page={page}
                data={data}
            />
        )
    );
};

export default Tickets;
