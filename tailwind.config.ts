import type { Config } from "tailwindcss";
export const color = {
    background: "#F0F2FF",
    background2: "#E5EAFF",
    primary: "#070D2F",
    lightBorder: "#CCD4FF",
    dbackground: "#090C1B",
    dbackground2: "#060813",
    dprimary: "#bfc7f2",
    dbutton: "#182678",
    dlightBorder: "#0D1126",
};
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "selector",
    theme: {
        extend: {
            fontFamily: { vazir: ["Vazir", "sans"] },
            colors: color,
            boxShadow: {
                cshadow: " 0px 0px 4px 0px rgba(24, 38, 120,0.5) ",
            },
        },
    },
    plugins: [],
} satisfies Config;
