import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { qrcode } from 'vite-plugin-qrcode';
import path from 'path';
import { fileURLToPath } from 'url';
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
export default defineConfig({
    plugins: [react(), qrcode()],
    server: {
        host: true,
    },
    base: '/',
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src')
        }
    }
});
