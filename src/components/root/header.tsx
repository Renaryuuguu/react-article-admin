import type { FC } from 'react'
import { Avatar, Button, Popconfirm, PopconfirmProps, Space } from 'antd'
import { Header } from 'antd/es/layout/layout'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import useAppStore, { selectCollapsed, setCollapsed } from '@/store/app-store'
import styles from '@/components/root/css/header.module.less'
import { resetAllStore } from '@/store/resetter'
import useUserStore, { selectAvatar, selectName } from '@/store/user-store'
import RootBreadcrumb from './breadcrumb'
const RootHeader: FC = () => {
  const collapsed = useAppStore(selectCollapsed)
  const avatar = useUserStore(selectAvatar)
  const name = useUserStore(selectName)
  const confirm: PopconfirmProps['onConfirm'] = () => {
    console.log('ok')
    resetAllStore()
  }
  useUserStore()
  return (
    <Header className={styles.container}>
      <Space direction="horizontal">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <span>欢迎：{name}， 您当前的位置是：</span>
        <RootBreadcrumb />
      </Space>
      <div>
        {avatar ? <Avatar src={avatar} /> : <Avatar icon={<UserOutlined />} />}
        <Popconfirm
          title="退出登录"
          description="您确认退出登录吗?"
          onConfirm={confirm}
          okText="确认"
          cancelText="取消">
          <Button type="link">Logout</Button>
        </Popconfirm>
      </div>
    </Header>
  )
}
export default RootHeader
