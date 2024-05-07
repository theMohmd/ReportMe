import { createContext, useState, ReactNode } from "react";
import { deleteCookie, setCookie } from "utils/cookie";
import { AuthContextType, userType } from "types/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userType | null>(null);

    const setToken = (token: string) => {
        setCookie("token", token);
    };
    const logOut = () => {
        setUser(null);
        deleteCookie("token");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, setToken, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
