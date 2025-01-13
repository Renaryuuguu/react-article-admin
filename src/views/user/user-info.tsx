import { updateUserApi } from '@/api/user-api'
import useUserStore, { selectUserInfo } from '@/store/user-store'
import { Button, Form, Input, message, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import type { FC } from 'react'
import { ActionFunctionArgs, useNavigation, useSubmit } from 'react-router-dom'

const UserInfo: FC = () => {
  const userInfo = useUserStore(selectUserInfo)
  const submit = useSubmit()
  const navigation = useNavigation()
  const [formRef] = useForm()
  const onFinish = (values: UserInfo) => {
    console.log(values)
    submit(values, {
      method: 'PUT',
    })
  }
  return (
    <Form
      style={{ maxWidth: 600 }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      onFinish={onFinish}
      initialValues={userInfo}
      autoComplete="off"
      form={formRef}>
      <Form.Item label="id" name="id" hidden>
        <Input readOnly />
      </Form.Item>
      <Form.Item
        label="昵称"
        name="nickname"
        rules={[
          {
            required: true,
            message: '请输入昵称',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          {
            required: true,
            message: '请输入邮箱',
          },
          {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '请输入正确的邮箱格式',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Space direction="horizontal">
          <Button
            type="primary"
            htmlType="submit"
            loading={navigation.state !== 'idle' && { delay: 200 }}>
            保存
          </Button>
          <Button
            type="default"
            onClick={() => formRef.setFieldsValue(userInfo)}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData()
  try {
    await updateUserApi(fd)
  } catch (error) {
    return null
  }
  message.success('更新成功！')
  return null
}

export default UserInfo
