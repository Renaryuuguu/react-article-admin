import { createBrowserRouter } from 'react-router-dom'

import Login, { action as loginAction } from '@/views/auth/login.tsx'
import Reg, { action as regAction } from '@/views/auth/reg.tsx'
import Root from '@/views/root.tsx'
import AuthLayout from '@/views/auth/auth-layout'
const route = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
    action: loginAction,
  },
  {
    path: '/reg',
    element: (
      <AuthLayout>
        <Reg />
      </AuthLayout>
    ),
    action: regAction,
  },
  {
    path: '/',
    element: <Root />,
  },
])

export default route
