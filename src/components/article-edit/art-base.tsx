import useArticleEditStore, {
  selectBase,
  updateBase,
  updateCurrent,
} from '@/store/art-edit-store'
import { Button, Form, Input, Select } from 'antd'
import type { FC } from 'react'
import { useLoaderData } from 'react-router-dom'

const EditBase: FC = () => {
  const loaderData = useLoaderData() as { cates: CateItem[] } | null
  const baseForm = useArticleEditStore(selectBase)
  const handleValuesChange = (values: ArticleEditBaseForm) => {
    updateBase(values)
  }
  const onFinish = () => {
    updateCurrent()
  }
  return (
    <>
      <Form
        style={{ maxWidth: 600 }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={baseForm}
        onValuesChange={handleValuesChange}
        onFinish={onFinish}>
        <Form.Item
          name="title"
          label="文章标题"
          rules={[{ required: true, message: '请输入文章标题' }]}>
          <Input
            placeholder="请输入文章标题"
            maxLength={30}
            allowClear
            showCount
          />
        </Form.Item>
        <Form.Item
          name="cate_id"
          label="文章分类"
          rules={[{ required: true, message: '请选择文章分类' }]}>
          <Select
            placeholder="请选择文章分类"
            options={loaderData?.cates || []}
            fieldNames={{
              label: 'cate_name',
              value: 'id',
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default EditBase
