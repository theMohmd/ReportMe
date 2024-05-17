import { t } from "i18next";
import { Link } from "react-router-dom";

//Relogin component
const Relogin = () => {
    return (
        <div className="flex flex-col justify-center items-center pb-48 grow ">
            <p className="text-4xl font-black">{t("common.relogin")}</p>
            <Link to="/login" className="mt-3 text-xl">
                {t("common.reloginLink")}
            </Link>
        </div>
    );
};

export default Relogin;
