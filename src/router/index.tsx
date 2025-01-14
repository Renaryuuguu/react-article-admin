import { createBrowserRouter } from 'react-router-dom'

import Login, { action as loginAction } from '@/views/auth/login.tsx'
import Reg, { action as regAction } from '@/views/auth/reg.tsx'
import Root, { loader as rootLoader } from '@/views/root/root.tsx'
import { action as userInfoAction } from '@/views/user/user-info.tsx'
import { action as userPwdAction } from '@/views/user/user-password.tsx'
import AuthLayout from '@/views/auth/auth-layout'
import RootAuth from '@/views/root/root-auth'
import Home from '@/views/home/home.tsx'
import ArticleCate from '@/views/article/article-cate'
import ArticleAdd from '@/views/article/article-add'
import ArticleEdit from '@/views/article/article-edit'
import ArticleList from '@/views/article/article-list'
import UserAvatar from '@/views/user/user-avatar'
import UserInfo from '@/views/user/user-info'
import UserPassword from '@/views/user/user-password'
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
    element: (
      <RootAuth>
        <Root />
      </RootAuth>
    ),
    loader: rootLoader,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'user-avatar', element: <UserAvatar /> },
      { path: 'user-info', element: <UserInfo />, action: userInfoAction },
      { path: 'user-pwd', element: <UserPassword />, action: userPwdAction },
      { path: 'art-add', element: <ArticleAdd /> },
      { path: 'art-cate', element: <ArticleCate /> },
      { path: 'art-edit', element: <ArticleEdit /> },
      { path: 'art-list', element: <ArticleList /> },
    ],
  },
])

export default route
