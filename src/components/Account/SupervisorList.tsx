import { useQuery } from "@tanstack/react-query";

import { customError } from "types/customError";
import { useGetSupervisors } from "./hooks/useGetSupervisors";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import { useState } from "react";
import UserListUi from "./UserListUi";

//SupervisorList component
const SupervisorList = () => {
    const [page, setPage] = useState(0);
    const query = useGetSupervisors();

    const { data, isLoading, error } = useQuery({
        queryKey: ["user-supervisors", "supervisors", page],
        queryFn: () => query(page + 1),
    });

    if (isLoading) return <Loader size={40} />;
    if (error) return <ErrorPage error={error as customError} />;
    return (
        data && (
            <UserListUi
                data={data}
                page={page}
                setPage={(input: number) => setPage(input)}
            />
        )
    );
};

export default SupervisorList;
