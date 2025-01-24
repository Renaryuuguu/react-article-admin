import ReactDOM from 'react-dom/client'
// App 根组件
// import App from "@/App.tsx";
// 全局样式表
import '@/index.less'
import { RouterProvider } from 'react-router-dom'
import route from './router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <RouterProvider router={route} />
  </ConfigProvider>,
)
