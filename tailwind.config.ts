import type { Config } from "tailwindcss";
export const color = {
    background: "#F0F2FF",
    background2: "#E5EAFF",
    primary: "#070D2F",
    lightBorder: "#CCD4FF",
    dbackground: "#090C1B",
    dbackground2: "#060813",
    dprimary: "#C7CEF5",
    dlightBorder: "#0D1126",
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
