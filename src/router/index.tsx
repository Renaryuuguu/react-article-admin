import { createBrowserRouter } from 'react-router-dom'

import Login, { action as loginAction } from '@/views/auth/login.tsx'
import Reg, { action as regAction } from '@/views/auth/reg.tsx'
import Root, { loader as rootLoader } from '@/views/root/root.tsx'
import UserInfo, { action as userInfoAction } from '@/views/user/user-info.tsx'
import UserPassword, {
  action as userPwdAction,
} from '@/views/user/user-password.tsx'
import UserAvatar, {
  action as userAvatarAction,
} from '@/views/user/user-avatar.tsx'

import ArticleCate, {
  loader as articleCateLoader,
  action as articleCateAction,
} from '@/views/article/article-cate.tsx'
import ArticleAdd, {
  loader as articleAddLoader,
  action as articleAddAction,
} from '@/views/article/article-add.tsx'
import ArticleEdit from '@/views/article/article-edit.tsx'
import ArticleList from '@/views/article/article-list.tsx'

import AuthLayout from '@/views/auth/auth-layout.tsx'
import RootAuth from '@/views/root/root-auth.tsx'
import Home from '@/views/home/home.tsx'

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
      {
        path: 'user-avatar',
        element: <UserAvatar />,
        action: userAvatarAction,
      },
      { path: 'user-info', element: <UserInfo />, action: userInfoAction },
      { path: 'user-pwd', element: <UserPassword />, action: userPwdAction },
      {
        path: 'art-add',
        element: <ArticleAdd />,
        loader: articleAddLoader,
        action: articleAddAction,
        shouldRevalidate: () => {
          return false
        },
      },
      {
        path: 'art-cate',
        element: <ArticleCate />,
        loader: articleCateLoader,
        action: articleCateAction,
      },
      { path: 'art-edit', element: <ArticleEdit /> },
      { path: 'art-list', element: <ArticleList /> },
    ],
  },
])

export default route
