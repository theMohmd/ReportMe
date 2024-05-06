export type userType = { name: string; email: string; id: number };
export type AuthContextType = {
    token: string;
    user: userType | null;
    _setToken: (token: string) => void;
    setUser: Dispatch<SetStateAction<userType | null>>;
    logOut: () => void;
};
