import { useAuth } from "contexts/Auth/useAuth";
import { userSupervisorType } from "types/userSupervisorType";
import { apiGetUserSupervisors } from "api/user-supervisors/apiGetUserSupervisors";

//a hook that return a function which utilizes api to return list of supervisor
export const useGetSupervisors = () => {
    const { user } = useAuth();
    return () =>
        apiGetUserSupervisors().then((res) => {
            return res.data
                .filter((item: userSupervisorType) => {
                    return item.user.id === user?.id;
                })
                .map((item: userSupervisorType) => {
                    return { USid: item.id, ...item.supervisor };
                });
        });
};
