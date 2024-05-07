import { t } from "i18next";
import { NavLink } from "react-router-dom";

//NotFound component
const NotFound = () => {
    return (
        <div className="flex flex-col pb-48 justify-center dark:text-dprimary text-primary items-center">
            <p className="relative text-8xl font-black">404</p>
            <p className="text-4xl">{t("common.pageNotFound")}</p>
            <NavLink to="/" className="text-xl mt-2">
                {t("common.pageNotFoundLink")}
            </NavLink>
        </div>
    );
};

export default NotFound;
