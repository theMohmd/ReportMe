import { useQuery } from "@tanstack/react-query";

import { customError } from "types/customError";
import { useGetSupervisors } from "./hooks/useGetSupervisors";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import { useState } from "react";
import UserListUi from "./UserListUi";
import { useDeleteUserSupervisors } from "./hooks/useDeleteSupervisor";
import { t } from "i18next";

//SupervisorList component
const SupervisorList = () => {
    const [page, setPage] = useState(0);
    const query = useGetSupervisors();
    const { mutate: deleteRequest } = useDeleteUserSupervisors();
    const deleteAction = (id: number) => {
        deleteRequest(
            { user_supervisor: id },
        );
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["user-supervisors", "supervisors", page],
        queryFn: () => query(page + 1),
    });

    if (isLoading) return <Loader size={40} />;
    if (error) return <ErrorPage error={error as customError} />;
    return (
        data && (
            <UserListUi
                emptyMessage={t("Account.noSupervisors")}
                data={data}
                page={page}
                setPage={(input: number) => setPage(input)}
                deleteAction={deleteAction}
            />
        )
    );
};

export default SupervisorList;
