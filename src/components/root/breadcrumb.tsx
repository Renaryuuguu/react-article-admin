import { Breadcrumb } from 'antd'
import { useMemo, type FC } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'
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
    if (menu.key === path) {
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
  const loaderData = useLoaderData() as { menus: MenuItem[] } | null
  const location = useLocation()
  const nowPath = location.pathname === '/' ? '/home' : location.pathname
  const items: breadcrumbItem[] | undefined = useMemo(
    () => resolveBreadcrumbItems(loaderData?.menus, nowPath),
    [loaderData, nowPath],
  )
  return <Breadcrumb items={items} />
}

export default RootBreadcrumb
