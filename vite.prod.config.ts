import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import type { UserConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { createHtmlPlugin } from 'vite-plugin-html'
import externalGlobals from 'rollup-plugin-external-globals'
const prodConfig: UserConfig = {
  plugins: [
    react(),
    visualizer({
      open: true
    }),
    externalGlobals({
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-quill': 'ReactQuill',
      'dayjs': 'dayjs',
      'antd': 'antd',
      'localforage': 'localforage'
    }),
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.tsx',
      inject: {
        data: {
          title: '文章后台管理系统',
          injectScript: `
          <script src='https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js'></script>
          <script src='https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js'></script>
          <script src='https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js'></script>
          <script src='https://cdn.jsdelivr.net/npm/antd@5.12.2/dist/antd.min.js'></script>
          <script src='https://cdn.jsdelivr.net/npm/react-quill@2.0.0/dist/react-quill.js'></script>
          <script src='https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js'></script>
          `
        }
      }
    })
  ],
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
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/entry/[name]-[hash].js',
        chunkFileNames: 'js/chunk/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[extname]'
      },
      external: [
        'react',
        'react-dom',
        'antd',
        'react-quill',
        'localforage',
        'dayjs',
      ]
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  },

}
export default prodConfig