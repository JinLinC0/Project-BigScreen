import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base:'./',
  build: {
    outDir: 'docs'
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {  // 配置路径别名
      '@': path.resolve(__dirname, 'src')  // 用@代表src文件夹
    }
  },
})