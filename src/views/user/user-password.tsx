import { updatePwdApi } from '@/api/user-api'
import { useNavSubmitting } from '@/utils/hooks'
import { Button, Form, Input, message, Space, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import type { FC } from 'react'
import { ActionFunctionArgs, useActionData, useSubmit } from 'react-router-dom'

const UserPassword: FC = () => {
  const submit = useSubmit()
  const [formRef] = useForm()
  const actionData = useActionData() as { result: boolean } | null
  const submitting = useNavSubmitting('PATCH')
  if (actionData?.result) {
    formRef.resetFields()
  }
  const onFinish = (values: resetPwdForm) => {
    if (submitting) return
    submit(values, {
      method: 'PATCH',
    })
  }

  return (
    <Form
      style={{ maxWidth: 600 }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      form={formRef}>
      <Spin spinning={submitting} delay={200}>
        <Form.Item
          label="原密码"
          name="old_pwd"
          rules={[
            {
              required: true,
              message: '请输入原密码',
            },
            {
              pattern: /^\S{6,15}$/,
              message: '密码长度为6-15位',
            },
          ]}
          validateFirst>
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="new_pwd"
          dependencies={['old_pwd']}
          rules={[
            {
              required: true,
              message: '请输入新密码',
            },
            {
              pattern: /^\S{6,15}$/,
              message: '密码长度为6-15位',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value === getFieldValue('old_pwd'))
                  return Promise.reject(new Error('新密码不能与原密码相同'))
                return Promise.resolve()
              },
            }),
          ]}
          validateFirst>
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="re_pwd"
          dependencies={['new_pwd']}
          rules={[
            {
              required: true,
              message: '请确认密码',
            },
            {
              pattern: /^\S{6,15}$/,
              message: '密码长度为6-15位',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value !== getFieldValue('new_pwd'))
                  return Promise.reject(new Error('两次密码输入不一致'))
                return Promise.resolve()
              },
            }),
          ]}
          validateFirst>
          <Input type="password" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button type="default" onClick={() => formRef.resetFields()}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Spin>
    </Form>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData()
  try {
    await updatePwdApi(fd)
  } catch (error) {
    console.log('error')
    return null
  }
  message.success('密码修改成功')
  return { result: true }
}

export default UserPassword
