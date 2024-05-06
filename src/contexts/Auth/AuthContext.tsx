import axios, { AxiosResponse } from "axios";
import { createContext, useState, ReactNode } from "react";
import { getCookie, setCookie } from "utils/cookie";
import { loginDataType } from "types/loginDataType";
import { signupDataType } from "types/signUpDataType";
import { AuthContextType, userType } from "types/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userType | null>(null); //request by cookie
    const [token, setToken] = useState(getCookie("token") || "");


    const setUserFunction = (response: AxiosResponse) => {
        //change
        setUser(response.data.user);
        console.log(response.data.user);
        setToken(response.data.accessToken);
        setCookie("token", response.data.accessToken, 1);
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization = response.data.accessToken;
            return config;
        });
    };
    const signUpActon = async (data: signupDataType) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/signup",
                data
            );
            if (response.data) {
                setUserFunction(response);
                return;
            }
            throw new Error(response.status.toString());
        } catch (err) {
            console.error(err);
        }
    };
    const loginAction = async (data: loginDataType) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/login",
                data
            );
            if (response.data) {
                setUserFunction(response);
                return;
            }
            throw new Error(response.status.toString());
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        //todo remove cookie
    };

    return (
        <AuthContext.Provider
            value={{ token, user, loginAction, signUpActon, logOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
