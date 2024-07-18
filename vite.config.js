import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        lang: 'es-ES',
        name: 'Farmacia BuenaSalud - Cuidando siempre de ti',
        short_name: 'Farmacia BuenaSalud',
        description:
          'En Farmacias Buena Salud podrás encontrar todo lo necesario para el cuidado tuyo y de tu familia.',
        background_color: '#444444',
        icons: [
          {
            src: 'logotipo64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'logotipo162x162.png',
            sizes: '162x162',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
});
