import { Breadcrumb } from 'antd'
import { useMemo, type FC } from 'react'
import {
  matchPath,
  useAsyncValue,
  useLoaderData,
  useLocation,
} from 'react-router-dom'
type breadcrumbItem = {
  title: string
}

const resolveBreadcrumbItems = (
  menus: MenuItem[] | undefined,
  path: string,
  breadcrumbItems: breadcrumbItem[] = [],
): breadcrumbItem[] | undefined => {
  if (!menus) return
  for (const menu of menus) {
    const matchResult = matchPath(menu.key, path)
    if (matchResult) {
      breadcrumbItems.unshift({ title: menu.label })
      return breadcrumbItems
    }
    if (menu.children) {
      const result = resolveBreadcrumbItems(
        menu.children,
        path,
        breadcrumbItems,
      )
      if (result) {
        breadcrumbItems.unshift({ title: menu.label })
        return breadcrumbItems
      }
    }
  }
}
const RootBreadcrumb: FC = () => {
  const [menuResult] = useAsyncValue() as [BaseResponse<MenuItem[]>]
  const menus = menuResult.data
  const location = useLocation()
  const nowPath = location.pathname === '/' ? '/home' : location.pathname
  const items: breadcrumbItem[] | undefined = useMemo(
    () => resolveBreadcrumbItems(menus, nowPath),
    [menus, nowPath],
  )
  return <Breadcrumb items={items} />
}

export default RootBreadcrumb
