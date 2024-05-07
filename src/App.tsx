import DesktopLayout from "components/Layouts/DesktopLayout";
import PhoneLayout from "components/Layouts/PhoneLayout";
import { useLang } from "contexts/Lang/useLang";
import { useTheme } from "contexts/Theme/useTheme";
import { useAuth } from "contexts/Auth/useAuth";
import Login from "components/Login/Login";
import Loader from "components/ui/Loader";
import { useGetUser } from "./hooks/useGetUser";
import { useWindowSize } from "./hooks/useWindowSize";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
    const { theme } = useTheme();
    const { lang } = useLang();
    const { user } = useAuth();
    const { isLoading } = useGetUser();
    const isLargeScreen = useWindowSize(768);

    return (
        <div
            dir={lang == "fa" ? "rtl" : "ltr"}
            className={`${theme ? "dark" : null}
            bg-background2 dark:bg-dbackground2 flex overflow-hidden h-dvh w-screen [&>*]:grow `}
        >
        <button className="absolute top-5 right-5 z-50 bg-red-600 p-2 text-white" onClick={()=>console.log(user)}>click me</button>{/* todo delete */}
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoading ? (
                            <div className="text-primary size-full flex items-center justify-center">
                                <div className="size-32">
                                    <Loader />
                                </div>
                            </div>
                        ) : !user ? (
                        <Navigate to={"/login"}/>
                        ) : isLargeScreen ? (
                            <DesktopLayout />
                        ) : (
                            <PhoneLayout />
                        )
                    }
                />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};
export default App;
