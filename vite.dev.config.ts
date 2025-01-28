import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import type { UserConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
const devConfig: UserConfig = {
  plugins: [react(), createHtmlPlugin({
    minify: false,
    entry: 'src/main.tsx',
    inject: {
      data: {
        title: 'dev-文章后台管理系统',
        injectScript: ''
      }
    }
  })],
  resolve: {
    alias: {
      // 配置 @ 的路径别名
      "@": join(__dirname, "./src/"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
}
export default devConfig