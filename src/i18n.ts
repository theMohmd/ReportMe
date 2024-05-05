import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define translations
const resources = {
    en: {
        translation: {
            navProjects: "Projects",
            navMessages: "Messages",
            navTickets: "Tickets",
            navAccount: "Account",
        },
    },
    fa: {
        translation: {
            navProjects: "پروژه‌ها",
            navMessages: "پیام‌ها",
            navTickets: "تیکت‌ها",
            navAccount: "حساب کاربری",
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
