export type langType = "fa" | "en";
export type langContextType = {
    lang: langType;
    setLang: (lang: langType) => void;
};
