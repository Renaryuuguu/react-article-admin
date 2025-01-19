import { Button, Input, Modal } from 'antd'
import { useEffect, useState, type FC } from 'react'
import { Form } from 'antd'
import { useActionData, useSubmit } from 'react-router-dom'
import { useNavLoading, useNavSubmitting } from '@/utils/hooks'

const BtnAdd: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formRef] = Form.useForm()
  const submit = useSubmit()
  const loading = useNavLoading('POST')
  const submitting = useNavSubmitting('POST')
  const actionData = useActionData() as boolean | null
  const showModal = () => {
    setIsModalOpen(true)
  }
  useEffect(() => {
    if (actionData && loading) setIsModalOpen(false)
  }, [loading, actionData])
  const handleOk = () => {
    formRef
      .validateFields()
      .then((values) => {
        console.log(values)
        submit(values, { method: 'POST' })
        // setIsModalOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
    console.log('ok')
    //
  }
  const handleCancel = () => {
    console.log('cancel')
    setIsModalOpen(false)
  }
  // console.log(navigation.formMethod)
  return (
    <>
      <Button type="primary" onClick={showModal}>
        添加分类
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        okText="添加"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={formRef.resetFields}
        okButtonProps={{
          loading: submitting && { delay: 200 },
        }}>
        <Form form={formRef} autoComplete="off" style={{ marginTop: 25 }}>
          <Form.Item
            label="文章类型"
            name="cate_name"
            rules={[
              { required: true, message: '请填写分类名称!' },
              {
                pattern: /^\S{1,10}$/,
                message: '分类名称必须是1-10位的非空字符!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="文章别名"
            name="cate_alias"
            rules={[
              { required: true, message: '请填写分类别名!' },
              {
                pattern: /^[0-9a-zA-Z]{1,15}$/,
                message: '分类别名必须是1-15位的字母数字!',
              },
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default BtnAdd
