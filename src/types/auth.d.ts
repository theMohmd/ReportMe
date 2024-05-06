export type userType = { name: string; email: string; id: number };
export type AuthContextType = {
    token: string;
    user: userType | null;
    loginAction: (data: loginDataType) => void;
    signUpActon: (data: signupDataType) => void;
    logOut: () => void;
};
