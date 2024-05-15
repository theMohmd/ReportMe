import { createContext, useState, ReactNode } from "react";
import { userType } from "src/types/userType";
import { deleteCookie, setCookie } from "utils/cookie";
export type AuthContextType = {
    user: userType | null;
    setUser: (input: userType | null) => void;
    setToken: (token: string) => void;
    logOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setuser] = useState<userType | null>(null);

    const setUser = (input: userType | null) => {
        setuser(input);
    };
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
