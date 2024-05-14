import { useQuery } from "@tanstack/react-query";
import Loader from "components/ui/Loader";
import { customError } from "types/customError";
import ErrorPage from "components/ui/ErrorPage";
import { useGetSupervisors } from "./hooks/useGetSupervisors";

//SupervisorList component
const SupervisorList = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["user-supervisor"],
        queryFn: useGetSupervisors,

    });
    if (isLoading) return <Loader />;
    if (error) return <ErrorPage error={error as customError} />;
    console.log(data)
    return <div>SupervisorList</div>;
};

export default SupervisorList;
