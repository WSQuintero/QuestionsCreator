import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "")
  return {
    // Configuración de Vite
    define: {
      __APP_ENV__: env.APP_ENV,
      "process.env": {
        VITE_APP_ID: JSON.stringify(env.VITE_APP_ID),
        VITE_MESSAGING_SENDER_ID: JSON.stringify(env.VITE_MESSAGING_SENDER_ID),
        VITE_STORAGE_BUCKET: JSON.stringify(env.VITE_STORAGE_BUCKET),
        VITE_PROJECT_ID: JSON.stringify(env.VITE_PROJECT_ID),
        VITE_AUTH_DOMAIN: JSON.stringify(env.VITE_AUTH_DOMAIN),
        VITE_API_KEY: JSON.stringify(env.VITE_API_KEY),
        VITE_API_KEY_MOVIE: JSON.stringify(env.VITE_API_KEY_MOVIE),
      },
    },
    plugins: [react()], // Agregar el plugin react
  }
})
