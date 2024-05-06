import { useContext } from "react";
import { AuthContext } from "contexts/Auth/AuthContext";
import { AuthContextType } from "src/types/auth";

export const useAuth = () => {
    return useContext(AuthContext) as AuthContextType;
};
