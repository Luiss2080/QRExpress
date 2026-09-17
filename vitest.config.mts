import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Next.js (App Router) does not expose its own Vite/webpack dev server for
// Vitest to hook into, so this config recreates just what the test suite
// needs standalone: the React plugin (JSX + fast refresh transforms) and
// the same "@/*" -> "src/*" path alias declared in tsconfig.json.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
