import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { nav_en, nav_fa } from "./nav";
import { login_en, login_fa } from "./login";
// Define translations
const resources = {
    en: {
        translation: {
            nav: nav_en,
            login: login_en,
            common: {
                pageNotFound: "Page not found!",
                pageNotFoundLink: "Click here to go back to home",
            },
        },
    },
    fa: {
        translation: {
            nav: nav_fa,
            login: login_fa,
            common: {
                pageNotFound: "صفحه مورد نظر یافت نشد!",
                pageNotFoundLink: "برای برگشت به خانه اینجا کلیک کنید",
            },
        },
    },
};

// Initialize i18next
i18n.use(initReactI18next).init({
    resources,
    lng: "fa", // Set default language
    interpolation: {
        escapeValue: false, // React already safely escapes interpolation
    },
});

export default i18n;
