import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#F0F2FF",
                background2: "#E5EAFF",
                primary: "#070D2F",
                lightBorder: "#070D2F",
                dbackground: "#050A1E",
                dbackground2: "#060813",
                dprimary: "#E5EAFF",
                dlightBorder: "#080E2B",

            },
        },
    },
    plugins: [],
} satisfies Config;
