import { t } from "i18next";
import { Link } from "react-router-dom";

//NotFound component
const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center pb-48 grow bg-background text-primary dark:text-dprimary">
            <p className="text-8xl font-black">404</p>
            <p className="text-4xl">{t("common.pageNotFound")}</p>
            <Link to="/" className="mt-2 text-xl">
                {t("common.pageNotFoundLink")}
            </Link>
        </div>
    );
};

export default NotFound;
