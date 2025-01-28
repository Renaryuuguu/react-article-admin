/* eslint-disable react-refresh/only-export-components */
// import React from "react";
import { Input, Form, Space, Button, message } from 'antd'
import type { FC } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, redirect, useSubmit } from 'react-router-dom'
import type { ActionFunctionArgs } from 'react-router-dom'
import { regApi } from '@/api/auth-api'
import { useNavSubmitting } from '@/utils/hooks'
const Reg: FC = () => {
  const submit = useSubmit()
  const submitting = useNavSubmitting('POST')
  const onFinish = (values: RegForm) => {
    if (submitting) return
    submit(values, {
      method: 'POST',
      action: '/reg',
    })
  }
  return (
    <Form wrapperCol={{ span: 24 }} labelCol={{ span: 4 }} onFinish={onFinish}>
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          { required: true, message: '请输入用户名！' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名只能包含字母、数字，长度为1-10位',
          },
        ]}>
        <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          { required: true, message: '请输入密码！' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度为6-15位，且不能包含空格',
          },
        ]}>
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="请输入密码"
        />
      </Form.Item>

      <Form.Item
        label="确认密码"
        name="repassword"
        dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码！' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度为6-15位，且不能包含空格',
          },
          // () => va,
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value === getFieldValue('password')) return Promise.resolve()
              else return Promise.reject(new Error('两次密码输入不一致!'))
            },
          }),
        ]}
        validateFirst>
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="请确认密码"
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Space direction="vertical">
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting && { delay: 200 }}>
            注册
          </Button>
          <div>
            转到<Link to="/login">登录</Link>
          </div>
        </Space>
      </Form.Item>
    </Form>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData()
  // console.log("formdata", Object.fromEntries(fd));
  // console.log(fd.get("username"), fd.get("password"), fd.get("repassword"));
  try {
    // await regApi("username=admin&password=123456&repassword=123456");
    await regApi(fd)

    message.success('注册成功，请登录')

    return redirect('/login?uname=' + fd.get('username'))
  } catch (error) {
    // message.error(error.response.data.message);
    return null
  }
  // const data = Object.fromEntries(fd);
  // const [err] = await to(regApi(data as RegForm));
  // if (err) {
  //   message.error(err.response.data.message);
  //   return null;
  // }
  // message.success("注册成功，请登录");

  // return redirect("/login?name=" + fd.get("username"));
}

export default Reg
