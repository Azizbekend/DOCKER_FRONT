import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const comm = command;
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
    ],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      port: Number(env.VITE_APP_PORT),
      cors: false,
      host: env.VITE_REACT_APP_HOST,
      proxy: {
        "/api": {
          target: `http://${env.VITE_BACKEND_HOST}:${env.VITE_BACKEND_PORT}`,
          changeOrigin: true,
          secure: false,
          headers: {
            'Connection': 'keep-alive',
            'Content-Type': 'application/json'
          },
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        },
      }
    },

    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@app', replacement: path.resolve(__dirname, 'src/app') },
        { find: '@api', replacement: path.resolve(__dirname, 'src/app/api') },
        { find: '@config', replacement: path.resolve(__dirname, 'src/app/config') },
        { find: '@router', replacement: path.resolve(__dirname, 'src/app/routers') },
        { find: '@entities', replacement: path.resolve(__dirname, 'src/entities') },
        { find: '@modules', replacement: path.resolve(__dirname, 'src/modules') },
        { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },

        { find: '@auth', replacement: path.resolve(__dirname, 'src/modules/auth') },
        { find: '@dispatcher', replacement: path.resolve(__dirname, 'src/modules/dispatcher') },
        { find: '@domain', replacement: path.resolve(__dirname, 'src/modules/domain') },
        { find: '@gis', replacement: path.resolve(__dirname, 'src/modules/gis') },
        { find: '@trieco', replacement: path.resolve(__dirname, 'src/modules/trieco') },

        { find: '@core-gis', replacement: path.resolve(__dirname, 'src/app/cores/core-gis') },
        { find: '@core-trieco', replacement: path.resolve(__dirname, 'src/app/cores/core-trieco') },
      ],
    }
  }
})
