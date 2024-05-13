import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { nav_en, nav_fa } from "./nav";
import { messages_en, messages_fa } from "./messages";
import { projects_en, projects_fa } from "./projects";
import { login_en, login_fa } from "./login";
// Define translations
const resources = {
    en: {
        translation: {
            nav: nav_en,
            messages: messages_en,
            projects: projects_en,
            login: login_en,
            common: {
                pageNotFound: "Page not found!",
                pageNotFoundLink: "Click here to go back to home",
                relogin: "You need to login again",
                reloginLink: "Click here to go to login page",
            },
        },
    },
    fa: {
        translation: {
            nav: nav_fa,
            messages: messages_fa,
            projects: projects_fa,
            login: login_fa,
            common: {
                pageNotFound: "صفحه مورد نظر یافت نشد!",
                pageNotFoundLink: "برای برگشت به خانه اینجا کلیک کنید",
                relogin: "باید دوباره وارد شوید",
                reloginLink: "برای رفتن به صفحه ورود اینجا کلیک کنید",
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
