/* eslint-disable react-refresh/only-export-components */
import type { FC } from 'react'
// import { Button, Form, Input, message, Space } from 'antd'
// import { Link, useFetcher, useSearchParams } from 'react-router-dom'
// import { LockOutlined, UserOutlined } from '@ant-design/icons'
import type { ActionFunctionArgs } from 'react-router-dom'
import { loginApi } from '@/api/auth-api'
import { setToken } from '@/store/app-store'
const Login: FC = () => {
  // const [searchParams] = useSearchParams()
  // //不能用 useNavigation 获取 state

  // const fetcher = useFetcher()
  // console.log(fetcher.state)
  // const onFinish = (values: LoginForm) => {
  //   if (fetcher.state === 'submitting') return
  //   fetcher.submit(values, {
  //     method: 'POST',
  //     action: '/login',
  //   })
  // }
  return (
    // <Form
    //   wrapperCol={{ span: 24 }}
    //   labelCol={{ span: 4 }}
    //   onFinish={onFinish}
    //   initialValues={{ username: searchParams.get('uname') }}>
    //   <Form.Item
    //     name="username"
    //     label="用户名"
    //     rules={[
    //       { required: true, message: '请输入用户名' },
    //       {
    //         pattern: /^[0-9a-zA-Z]{1,10}$/,
    //         message: '用户名必须是1-10位的字母数字！',
    //       },
    //     ]}>
    //     <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
    //   </Form.Item>
    //   <Form.Item
    //     name="password"
    //     label="密码"
    //     rules={[
    //       { required: true, message: '请输入密码' },
    //       { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符！' },
    //     ]}>
    //     <Input
    //       prefix={<LockOutlined />}
    //       type="password"
    //       placeholder="请输入密码"
    //     />
    //   </Form.Item>
    //   <Form.Item wrapperCol={{ offset: 4 }}>
    //     <Space direction="vertical">
    //       <Button
    //         type="primary"
    //         htmlType="submit"
    //         loading={fetcher.state === 'submitting' && { delay: 200 }}>
    //         登录
    //       </Button>
    //       <div>
    //         转到 <Link to="/reg">注册</Link>
    //       </div>
    //     </Space>
    //   </Form.Item>
    // </Form>
    <div>test</div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData()
  try {
    const res = await loginApi(fd)
    // message.success(res.message)
    setToken(res.token)
    // return redirect('/')
    return null
  } catch (err) {
    return null
  }
}
export default Login
