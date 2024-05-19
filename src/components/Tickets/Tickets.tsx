import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { apiGetTickets } from "api/tickets/apiGetTickets";
import { customError } from "types/customError";

import Loader from "components/ui/Loader";
import TicketsUi from "./TicketsUi";
import ErrorPage from "components/ui/ErrorPage";

//Tickets page component
const Tickets = () => {
    const [page, setpage] = useState(0);
    const { data, error, isLoading } = useQuery({
        queryKey: ["tickets", page],
        queryFn: () => apiGetTickets({ page: page + 1 }),
    });
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
