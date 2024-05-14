import { t } from "i18next";

//ReportsUi component
const ReportsUi = () => {
    return (
        <div className="flex overflow-y-auto flex-col gap-2 p-5 pt-10 size-full">
            <div className="h-12 flex justify-between items-center px-2 mb-5">
                <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                    {t("Reports.reports")}
                </p>
            </div>
        </div>
    );
};

export default ReportsUi;
