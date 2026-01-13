import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load file n8nConfig.env
  const envFile = resolve(__dirname, 'n8nConfig.env')
  let envVars = {}
  
  try {
    const envContent = readFileSync(envFile, 'utf-8')
    envContent.split('\n').forEach(line => {
      const trimmedLine = line.trim()
      // Bỏ qua comment và dòng trống
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=')
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim()
        }
      }
    })
  } catch (error) {
    console.warn('Không thể đọc file n8nConfig.env:', error.message)
  }

  // Load các biến môi trường mặc định từ .env files
  const env = loadEnv(mode, process.cwd(), '')

  // Merge với biến từ n8nConfig.env (ưu tiên n8nConfig.env)
  const finalEnv = { ...env, ...envVars }

  return {
    plugins: [react()],
    define: {
      // Đảm bảo các biến VITE_ được expose
      ...Object.keys(finalEnv).reduce((prev, key) => {
        if (key.startsWith('VITE_')) {
          prev[`import.meta.env.${key}`] = JSON.stringify(finalEnv[key])
        }
        return prev
      }, {}),
    },
    // Expose env vars cho client
    envPrefix: 'VITE_',
  }
})
