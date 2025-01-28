import route from '@/router'
import useAppStore, { selectToken } from '@/store/app-store'
import { PropsWithChildren } from 'react'
import { matchRoutes, Navigate, useLocation } from 'react-router-dom'

const RootAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useAppStore(selectToken)
  const location = useLocation()
  if (!token) {
    const nextURL = location.pathname + location.search
    const matchResult = matchRoutes(route.routes, nextURL)
    console.log(matchResult)
    if (
      matchResult &&
      matchResult.length !== 0 &&
      matchResult[matchResult.length - 1].route.path === '*'
    ) {
      return <Navigate to="/login" replace />
    } else {
      const to =
        nextURL === '/' || nextURL === '/home'
          ? '/login'
          : '/login?from=' + nextURL
      console.log(to)
      return <Navigate to={to} replace />
    }
  }
  return <>{children}</>
}

export default RootAuth
