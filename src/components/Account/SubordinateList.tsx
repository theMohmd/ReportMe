import { useQuery } from "@tanstack/react-query";

import { customError } from "types/customError";
import { useGetSubordinates } from "./hooks/useGetSubordinates";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import { useState } from "react";
import UserListUi from "./UserListUi";

//SubordinateList component
const SubordinateList = () => {
    const [page, setPage] = useState(0);
    const query = useGetSubordinates();

    const { data, isLoading, error } = useQuery({
        queryKey: ["user-supervisors", "subordinates", page],
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

export default SubordinateList;
