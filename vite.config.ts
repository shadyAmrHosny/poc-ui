import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
//const PORT = Number(process.env.PORT) || 4000
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    allowedHosts: true
  },
  plugins: [
    react(),
    mode === 'development'
    //&& componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));


// import eslint from "vite-plugin-eslint";
// https://vitejs.dev/config/
// export default defineConfig({
//   server:{
//     host:'0.0.0.0',
//    // allowedHosts:['.us-central1.run.app']
//     allowedHosts: ['poc-ui-709131701862.us-central1.run.app']
//   },
//   plugins: [react(),],
// });
