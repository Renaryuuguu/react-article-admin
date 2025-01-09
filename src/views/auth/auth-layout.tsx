// import { PropsWithChildren } from "react";
import React, { PropsWithChildren } from 'react'
import styles from './css/auth-layout.module.less'
// const authLayout = ({ children }: PropsWithChildren) => {
//   return <div>{children}</div>;
// };
// export default authLayout;

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>{children}</div>
    </div>
  )
}

export default AuthLayout
