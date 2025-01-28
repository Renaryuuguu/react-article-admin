// import { PropsWithChildren } from "react";
import React, { PropsWithChildren } from 'react'
import styles from './css/auth-layout.module.less'
import useAppStore, { selectToken } from '@/store/app-store'
import { Navigate, useLocation } from 'react-router-dom'
// const authLayout = ({ children }: PropsWithChildren) => {
//   return <div>{children}</div>;
// };
// export default authLayout;

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useAppStore(selectToken)
  const location = useLocation()
  if (token) {
    let nextURL = ''
    if (location.search.includes('?from=')) {
      const search = location.search.replace('?from=', '')
      nextURL = search ? search : '/'
    } else {
      nextURL = '/'
    }
    return <Navigate to={nextURL} replace />
  }
  return (
    <div className={styles.container}>
      <div className={styles.box}>{children}</div>
    </div>
  )
}

export default AuthLayout
