import type { FC } from 'react'
import { Layout } from 'antd'
import styles from './css/root.module.less'
import logo from '@/assets/images/logo.svg'
import RootHeader from '@/components/root/header'
import RootMenu from '@/components/root/menu'
import useAppStore, { selectCollapsed } from '@/store/app-store'
import { initUser } from '@/store/user-store'
import { getMenuApi } from '@/api/user-api'
import { Outlet } from 'react-router-dom'
const { Sider, Content, Footer } = Layout

const Root: FC = () => {
  // const [collapsed, setCollapsed] = useState(false)
  const collapsed = useAppStore(selectCollapsed)

  return (
    <Layout className={styles.container}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.boxLogo}>
          <img src={logo} alt="logo" className={styles.logo} />
          {!collapsed && <span className={styles.logoText}>文章管理系统</span>}
        </div>
        <RootMenu />
      </Sider>
      <Layout>
        <RootHeader />
        <Content className={styles.content}>
          <Outlet />
        </Content>
        <Footer className={styles.footer}>
          Powered by &copy;React Article Admin
        </Footer>
      </Layout>
    </Layout>
  )
}

export const loader = async () => {
  initUser()
  try {
    const res = await getMenuApi()
    return {
      menus: res.data,
    }
  } catch (error) {
    return null
  }
}
export default Root
