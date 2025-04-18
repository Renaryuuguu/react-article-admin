import { Menu, MenuProps } from 'antd'
import { useState, type FC } from 'react'
import { useAsyncValue, useLocation, useNavigate } from 'react-router-dom'
import {
  HomeOutlined,
  ReadOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  FileAddOutlined,
  FileTextOutlined,
  UserOutlined,
  SolutionOutlined,
  PictureOutlined,
  KeyOutlined,
} from '@ant-design/icons'
const iconMap = {
  HomeOutlined: <HomeOutlined />,
  ReadOutlined: <ReadOutlined />,
  AppstoreOutlined: <AppstoreOutlined />,
  ProfileOutlined: <ProfileOutlined />,
  FileAddOutlined: <FileAddOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  UserOutlined: <UserOutlined />,
  SolutionOutlined: <SolutionOutlined />,
  PictureOutlined: <PictureOutlined />,
  KeyOutlined: <KeyOutlined />,
}
const resolveMenuIcon = (menus: MenuItem[]) => {
  for (const menu of menus) {
    const iconName = menu.icon as keyof typeof iconMap
    menu.icon = iconMap[iconName]
    if (menu.children) {
      resolveMenuIcon(menu.children)
    }
  }
}
const rootSubmenuKeys = ['2', '3']
const findParentKeys = (
  menus: MenuItem[],
  key: string,
  parentKey: string = '',
): string => {
  if (!menus) return ''
  for (const menu of menus) {
    if (menu.key === key) {
      return parentKey
    }
    if (menu.children) {
      const parentKey = findParentKeys(menu.children, key, menu.key)
      if (parentKey) {
        console.log(parentKey)
        return parentKey
      }
    }
  }
  return ''
}
const RootMenu: FC = () => {
  const location = useLocation()
  const selectedKeys = location.pathname === '/' ? '/home' : location.pathname
  const navigate = useNavigate()
  // const data = useLoaderData() as { menus: MenuItem[] } | null
  const [menuResult] = useAsyncValue() as [BaseResponse<MenuItem[]>]
  const menus = menuResult.data || []
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([
    findParentKeys(menus, selectedKeys),
  ])
  // console.log(data)
  // if (!data) {
  //   return
  // }
  // const { menus } = data
  resolveMenuIcon(menus)

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKeys = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1,
    )
    if (currentOpenKeys && rootSubmenuKeys.indexOf(currentOpenKeys) === -1) {
      setStateOpenKeys(openKeys)
    } else {
      setStateOpenKeys(currentOpenKeys ? [currentOpenKeys] : [])
    }
  }
  const onMenuItemClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      items={menus}
      selectedKeys={[selectedKeys]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      onClick={onMenuItemClick}
    />
  )
}

export default RootMenu
