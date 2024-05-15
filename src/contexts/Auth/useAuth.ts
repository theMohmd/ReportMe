import { useContext } from "react";
import { AuthContext } from "contexts/Auth/AuthContext";
import { AuthContextType } from "contexts/Auth/AuthContext";

export const useAuth = () => {
    return useContext(AuthContext) as AuthContextType;
};
