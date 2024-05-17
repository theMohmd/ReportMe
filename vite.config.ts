import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: "/src",
            api: "/src/api",
            components: "/src/components",
            contexts: "/src/contexts",
            hooks: "/src/hooks",
            types: "/src/types",
            utils: "/src/utils",
        },
    },
});
