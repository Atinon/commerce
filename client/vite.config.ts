import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "dist",

    rollupOptions: {
      input: {
        greetIsland: path.resolve(__dirname, "src/islands/greetIsland.tsx"),
      },
      output: {
        entryFileNames: "assets/[name].js", // currently not hashing becuase vite still serving assets and manifest is not available to server
      },
    },
  },
});
