import type React from 'react'
// 导入模块化的 CSS 样式
// import { styles } from "@/App.module.less";
import styles, { title, content } from '@/App.module.less'

const App: React.FC = () => {
  return (
    // 绑定模块化的 CSS 样式
    <div className={styles.container}>
      <h1 className={title}>App Component</h1>
      <hr />
      <p className={content}>abcef</p>
    </div>
  )
}

export default App
