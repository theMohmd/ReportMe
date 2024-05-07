export type userType = { name: string; email: string; id: number };
export type AuthContextType = {
    user: userType | null;
    setUser: Dispatch<SetStateAction<userType | null>>;
    setToken: (token: string) => void;
    logOut: () => void;
};
