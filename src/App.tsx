import { Navigate, Route, Routes } from "react-router-dom";

import { useLang } from "contexts/Lang/useLang";
import { useTheme } from "contexts/Theme/useTheme";
import { useAuth } from "contexts/Auth/useAuth";
import { useQueryGetUser } from "./hooks/useQueryGetUser";

import Login from "components/Login/Login";
import Loader from "components/ui/Loader";
import NotFound from "components/Common/NotFound/NotFound";
import Layout from "components/Layout/Layout";
import Relogin from "components/Common/ReLogin/ReLogin";
import { useConfirm } from "./components/Common/ConfirmModal/useConfirm";
import ConfirmModal from "./components/Common/ConfirmModal/ConfirmModal";
import { AnimatePresence } from "framer-motion";

const App = () => {
    const { theme } = useTheme();
    const { lang } = useLang();
    const { user } = useAuth();
    const { isLoading } = useQueryGetUser();
    const { displayed: confirmModal } = useConfirm();

    return (
        <div
            dir={lang == "fa" ? "rtl" : "ltr"}
            className={`${theme === "dark" ? "dark" : null}
            text-primary dark:text-dprimary
            bg-background2 font-vazir dark:bg-dbackground2 flex overflow-hidden h-dvh w-screen [&>*]:grow `}
        >
            {/******************************************************************************
            confirm modal
            ******************************************************************************/}
            <AnimatePresence>
            {confirmModal && <ConfirmModal />}
            </AnimatePresence>
            {/******************************************************************************
            content
            ******************************************************************************/}
            {isLoading ? (
                <Loader size={100} />
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
