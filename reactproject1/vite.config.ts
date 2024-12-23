import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        hmr: {
            clientPort :3030,
            host: "localhost",
            protocol: "ws",
        },
        host: true,
        port: parseInt(process.env.PORT ?? "5173"),
        proxy: {
            '/api': {
                target: process.env.services__weatherapi__https__0 || process.env.services__weatherapi__http__0,
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
                secure: false
            }
        }
    }
})
