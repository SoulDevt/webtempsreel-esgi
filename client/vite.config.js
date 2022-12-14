import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: env.PORT_CLIENT || 8000,
      host: '0.0.0.0',
      watch: {
        usePolling: true
      }
    },
    define: {
      'process.env': env
    }
  };
});
