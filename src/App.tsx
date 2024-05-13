import { Navigate, Route, Routes } from "react-router-dom";

import { useLang } from "contexts/Lang/useLang";
import { useTheme } from "contexts/Theme/useTheme";
import { useAuth } from "contexts/Auth/useAuth";

import Login from "components/Login/Login";
import Loader from "components/ui/Loader";
import NotFound from "components/NotFound/NotFound";
import Layout from "components/Layout/Layout";

import { useGetUser } from "hooks/useGetUser";
import Relogin from "./components/ReLogin/ReLogin";

const App = () => {
    const { theme } = useTheme();
    const { lang } = useLang();
    const { user } = useAuth();
    const { isLoading } = useGetUser();

    return (
        <div
            dir={lang == "fa" ? "rtl" : "ltr"}
            className={`${theme === "dark" ? "dark" : null}
            bg-background2 font-vazir dark:bg-dbackground2 flex overflow-hidden h-dvh w-screen [&>*]:grow `}
        >
            {/* todo delete */}
            <button
                className=" hidden absolute top-5 right-5 z-50 bg-red-600 p-2 text-white"
                onClick={() => console.log()}
            >
                click me
            </button>
            {isLoading ? (
                <Loader className="text-primary" size={100} />
            ) : (
                <Routes>
                    <Route
                        path="/login"
                        element={!user ? <Login /> : <Navigate to="/" />}
                    />
                    <Route path="404" element={<NotFound />} />
                    <Route path="relogin" element={<Relogin />} />
                    <Route
                        path="*"
                        element={!user ? <Navigate to="/login" /> : <Layout />}
                    />
                </Routes>
            )}
        </div>
    );
};
export default App;
