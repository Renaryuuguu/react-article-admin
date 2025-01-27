import useArticleEditStore, {
  selectBase,
  updateBase,
  updateCurrent,
} from '@/store/art-edit-store'
import { Button, Form, Input, Select } from 'antd'
import { Suspense, useEffect, type FC } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
const EditBase: FC = () => {
  const loaderData = useLoaderData() as {
    cates: Promise<BaseResponse<CateItem[]>>
    flag: Promise<true | null>
  }
  const baseForm = useArticleEditStore(selectBase)
  const [formRef] = Form.useForm()
  useEffect(() => {
    formRef.setFieldsValue(baseForm)
  }, [baseForm, formRef])
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
        onFinish={onFinish}
        form={formRef}>
        <Suspense
          fallback={
            <Form.Item
              label="文章标题"
              rules={[{ required: true, message: '请输入文章标题' }]}>
              <Input
                placeholder="请输入文章标题"
                suffix={
                  <LoadingOutlined style={{ color: '#d3d3d3', fontSize: 12 }} />
                }
              />
            </Form.Item>
          }>
          <Await resolve={loaderData.flag}>
            {() => {
              return (
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
              )
            }}
          </Await>
        </Suspense>
        <Suspense
          fallback={
            <Form.Item
              label="文章分类"
              rules={[{ required: true, message: '请选择文章分类' }]}>
              <Select placeholder="请选择文章分类" options={[]} loading />
            </Form.Item>
          }>
          <Await resolve={loaderData.cates}>
            {(cates: BaseResponse<CateItem[]>) => {
              return (
                <>
                  <Form.Item
                    name="cate_id"
                    label="文章分类"
                    rules={[{ required: true, message: '请选择文章分类' }]}>
                    <Select
                      placeholder="请选择文章分类"
                      options={cates.data}
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
                </>
              )
            }}
          </Await>
        </Suspense>
      </Form>
    </>
  )
}

export default EditBase
