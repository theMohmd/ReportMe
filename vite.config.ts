import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: "/src",
            components: "/src/components",
            utils: "/src/utils",
            hooks: "/src/hooks",
            api: "/src/api",
            contexts: "/src/contexts",
            types: "/src/types",
        },
    },
});
