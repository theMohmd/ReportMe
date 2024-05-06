import type { Config } from "tailwindcss";
export const color = {
    background: "#F0F2FF",
    background2: "#E5EAFF",
    primary: "#070D2F",
    lightBorder: "#CCD4FF",
    dbackground: "#050A1E",
    dbackground2: "#060813",
    dprimary: "#E5EAFF",
    dlightBorder: "#080E2B",
};
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "selector",
    theme: {
        extend: {
            colors: color,
        },
    },
    plugins: [],
} satisfies Config;
