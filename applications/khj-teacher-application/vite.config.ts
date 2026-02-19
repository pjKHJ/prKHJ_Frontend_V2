import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@khj/hooks": path.resolve(__dirname, "../../modules/khj-hooks/index.ts"),
      "@khj/hooks/": path.resolve(__dirname, "../../modules/khj-hooks/"),
      "@khj/user-interfaces": path.resolve(
        __dirname,
        "../../modules/khj-user-interfaces/index.ts",
      ),
      "@khj/user-interfaces/": path.resolve(
        __dirname,
        "../../modules/khj-user-interfaces/",
      ),
      "@khj/utils": path.resolve(__dirname, "../../modules/khj-utils/index.ts"),
      "@khj/utils/": path.resolve(__dirname, "../../modules/khj-utils/"),
    },
  },
});
