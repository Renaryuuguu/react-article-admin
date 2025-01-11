import useAppStore, { selectToken } from '@/store/app-store'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

const RootAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useAppStore(selectToken)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export default RootAuth
