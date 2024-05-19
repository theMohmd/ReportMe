import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { nav_en, nav_fa } from "./nav";
import { messages_en, messages_fa } from "./messages";
import { projects_en, projects_fa } from "./projects";
import { login_en, login_fa } from "./login";
import { account_en, account_fa } from "./account";
import { reports_en, reports_fa } from "./reports";
import { tickets_en, tickets_fa } from "./tickets";
import { warnings_en, warnings_fa } from "./warnings";
// Define translations
const resources = {
    en: {
        translation: {
            nav: nav_en,
            Messages: messages_en,
            Projects: projects_en,
            Tickets: tickets_en,
            Warnings: warnings_en,
            Reports: reports_en,
            Account: account_en,
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
            Messages: messages_fa,
            Projects: projects_fa,
            Tickets: tickets_fa,
            Warnings: warnings_fa,
            Reports: reports_fa,
            Account: account_fa,
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
