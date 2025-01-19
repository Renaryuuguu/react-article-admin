import { useNavLoading, useNavSubmitting } from '@/utils/hooks'
import { Button, Form, Input, message, Modal } from 'antd'
import { useEffect, useState, type FC } from 'react'
import { useActionData, useSubmit } from 'react-router-dom'

const BtnEdit: FC<{ cate: CateItem }> = ({ cate }) => {
  const [formRef] = Form.useForm<CateItem>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const submit = useSubmit()
  const submitting = useNavSubmitting('PUT')
  const loading = useNavLoading('PUT')
  const actionData = useActionData() as boolean | null
  useEffect(() => {
    if (loading && actionData) setIsModalOpen(false)
  }, [loading, actionData])
  const showEditModal = () => {
    if (cate.id === 1 || cate.id === 2)
      return message.error('管理员不允许修改此数据！')
    formRef.setFieldsValue(cate)
    setIsModalOpen(true)
  }
  const handleOk = () => {
    formRef
      .validateFields()
      .then((values) => {
        console.log(values)
        submit(values, { method: 'PUT' })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <Button type="link" size="small" onClick={showEditModal}>
        修改
      </Button>
      <Modal
        title="修改文章分类"
        open={isModalOpen}
        okText="保存"
        cancelText="取消"
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        afterClose={() => formRef.resetFields()}
        okButtonProps={{ loading: submitting && { delay: 200 } }}>
        <Form form={formRef} autoComplete="off" style={{ marginTop: 25 }}>
          <Form.Item hidden name="id">
            <Input readOnly />
          </Form.Item>
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

export default BtnEdit
