// import { PropsWithChildren } from "react";
import React, { PropsWithChildren } from 'react'
import styles from './css/auth-layout.module.less'
import useAppStore, { selectToken } from '@/store/app-store'
import { Navigate } from 'react-router-dom'
// const authLayout = ({ children }: PropsWithChildren) => {
//   return <div>{children}</div>;
// };
// export default authLayout;

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useAppStore(selectToken)
  if (token) {
    return <Navigate to="/" replace />
  }
  return (
    <div className={styles.container}>
      <div className={styles.box}>{children}</div>
    </div>
  )
}

export default AuthLayout
