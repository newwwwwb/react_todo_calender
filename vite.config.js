import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({mode}) => ({
  // production일 때만 repo 기반 base를 유지합니다.
  base: mode === 'production' ? '/react_todo_calender/' : '/',
  build: {
    outDir: "docs",
  },
  plugins: [
    react(),
  ],
}));
