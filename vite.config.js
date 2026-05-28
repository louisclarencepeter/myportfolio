import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        impressum: resolve(__dirname, "impressum.html"),
      },
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) {
              return "vendor-react";
            }
            if (id.includes("@fortawesome")) {
              return "vendor-fa";
            }
            return "vendor";
          }
          return undefined;
        },
      },
    },
  },
  server: {
    port: 3007,
  },
});
