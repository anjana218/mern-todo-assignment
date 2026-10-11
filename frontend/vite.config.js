import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev server runs on :3000 to match backend's FRONTEND_ORIGIN / CORS setting.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
