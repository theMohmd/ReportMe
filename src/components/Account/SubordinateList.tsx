import { useQuery } from "@tanstack/react-query";

import { customError } from "types/customError";
import { useGetSubordinates } from "./hooks/useGetSubordinates";

import Loader from "components/ui/Loader";
import ErrorPage from "components/ui/ErrorPage";
import { useState } from "react";
import UserListUi from "./UserListUi";
import { useDeleteUserSupervisors } from "./hooks/useDeleteSupervisor";
import { t } from "i18next";

//SubordinateList component
const SubordinateList = () => {
    const [page, setPage] = useState(0);
    const query = useGetSubordinates();

    const { data, isLoading, error } = useQuery({
        queryKey: ["user-supervisors", "subordinates", page],
        queryFn: () => query(page + 1),
    });
    const { mutate: deleteRequest } = useDeleteUserSupervisors();
    const deleteAction = (id: number) => {
        deleteRequest(
            { user_supervisor: id },
        );
    };

    if (isLoading) return <Loader size={40} />;
    if (error) return <ErrorPage error={error as customError} />;
    return (
        data && (
            <UserListUi
                data={data}
                page={page}
                setPage={(input: number) => setPage(input)}
                deleteAction={deleteAction}
                emptyMessage={t("Account.noSubordinates")}
            />
        )
    );
};

export default SubordinateList;
