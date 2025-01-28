import { createBrowserRouter } from 'react-router-dom'

import AuthLayout from '@/views/auth/auth-layout.tsx'
import RootAuth from '@/views/root/root-auth.tsx'
import RouterErrorElement from '@/components/common/router-error-element'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
const route = createBrowserRouter([
  {
    path: '/login',
    errorElement: <RouterErrorElement />,
    async lazy() {
      const { default: Login, action } = await import('@/views/auth/login.tsx')
      return {
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
        action,
      }
    },
  },
  {
    path: '/reg',
    errorElement: <RouterErrorElement />,
    async lazy() {
      const { default: Reg, action } = await import('@/views/auth/reg.tsx')
      return {
        element: (
          <AuthLayout>
            <Reg />
          </AuthLayout>
        ),
        action,
      }
    },
  },
  {
    path: '/',
    errorElement: <RouterErrorElement />,
    async lazy() {
      const { default: Root, loader } = await import('@/views/root/root.tsx')
      return {
        element: (
          <RootAuth>
            <Root />
          </RootAuth>
        ),
        loader,
      }
    },
    children: [
      {
        errorElement: <RouterErrorElement />,
        children: [
          {
            index: true,
            async lazy() {
              const { default: Home } = await import('@/views/home/home.tsx')
              return { Component: Home }
            },
          },
          {
            path: 'home',
            async lazy() {
              const { default: Home } = await import('@/views/home/home.tsx')
              return { Component: Home }
            },
          },
          {
            path: 'user-avatar',
            async lazy() {
              const { default: UserAvatar, action } = await import(
                '@/views/user/user-avatar.tsx'
              )
              return {
                Component: UserAvatar,
                action,
              }
            },
          },
          {
            path: 'user-info',
            async lazy() {
              const { default: UserInfo, action } = await import(
                '@/views/user/user-info.tsx'
              )
              return {
                Component: UserInfo,
                action,
              }
            },
          },
          {
            path: 'user-pwd',
            async lazy() {
              const { default: UserPassword, action } = await import(
                '@/views/user/user-password.tsx'
              )
              return {
                Component: UserPassword,
                action,
              }
            },
          },
          {
            path: 'art-add',
            async lazy() {
              const {
                default: ArticleAdd,
                loader,
                action,
              } = await import('@/views/article/article-add.tsx')
              return {
                Component: ArticleAdd,
                loader,
                action,
              }
            },
            shouldRevalidate: () => {
              return false
            },
          },
          {
            path: 'art-cate',
            async lazy() {
              const {
                default: ArticleCate,
                action,
                loader,
              } = await import('@/views/article/article-cate.tsx')
              return {
                Component: ArticleCate,
                action,
                loader,
              }
            },
          },
          {
            path: 'art-edit/:id',
            async lazy() {
              const {
                default: ArticleEdit,
                action,
                loader,
              } = await import('@/views/article/article-edit.tsx')
              return {
                Component: ArticleEdit,
                loader,
                action,
              }
            },
            shouldRevalidate: () => {
              return false
            },
          },
          {
            path: 'art-list',
            async lazy() {
              const {
                default: ArticleList,
                action,
                loader,
              } = await import('@/views/article/article-list.tsx')
              return {
                Component: ArticleList,
                action,
                loader,
              }
            },
          },
          {
            path: '*',
            async lazy() {
              const { default: PageNotFound } = await import(
                '@/components/common/404.tsx'
              )
              return {
                Component: PageNotFound,
              }
            },
          },
        ],
      },
    ],
  },
])
route.subscribe((state) => {
  if (state.navigation.location) {
    nProgress.start()
  } else {
    nProgress.done()
  }
})
export default route
