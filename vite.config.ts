import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    qwikCity(),
    qwikVite(),
    tsconfigPaths({ root: "." }),
    tailwindcss(),
  ],
  server: { host: "127.0.0.1", headers: { "Cache-Control": "no-store" } },
});
