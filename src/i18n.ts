import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define translations
const resources = {
    en: {
        translation: {
            test: "Hello!",
        },
    },
    fa: {
        translation: {
            test: "سلام",
        },
    },
};

// Initialize i18next
i18n.use(initReactI18next).init({
    resources,
    lng: "en", // Set default language
    interpolation: {
        escapeValue: false, // React already safely escapes interpolation
    },
});

export default i18n;
