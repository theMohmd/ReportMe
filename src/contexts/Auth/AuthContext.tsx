import axios from "axios";
import { createContext, useState, ReactNode } from "react";
import { deleteCookie, getCookie, setCookie } from "utils/cookie";
import { AuthContextType, userType } from "types/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userType | null>(null); //request by cookie
    const [token, setToken] = useState(getCookie("token") || "");

    const _setToken = (token: string) => {
        setCookie("token", token);
        setToken(token);
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization = token;
            return config;
        });
    };
    const logOut = () => {
        setUser(null);
        setToken("");
        deleteCookie("token");
    };

    return (
        <AuthContext.Provider
            value={{ token, user, _setToken, setUser, logOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
