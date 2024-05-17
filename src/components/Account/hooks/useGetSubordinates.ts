import { useAuth } from "contexts/Auth/useAuth";
import { userSupervisorType } from "types/userSupervisorType";
import { apiGetUserSupervisors } from "api/user-supervisors/apiGetUserSupervisors";

//a hook that return a function which utilizes api to return list of subordinate
export const useGetSubordinates = () => {
    const { user } = useAuth();
    return (page: number = 1) =>
        apiGetUserSupervisors({ input: "", mode: "", page: page }).then(
            (res) => {
                return {
                    total: res.total,
                    data: res.data
                        .filter((item: userSupervisorType) => {
                            return item.supervisor.id === user?.id;
                        })
                        .map((item: userSupervisorType) => {
                            return { USid: item.id, ...item.user };
                        }),
                };
            }
        );
};
