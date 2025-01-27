import { Button, FormProps, Input, Select } from 'antd'
import { Suspense, useLayoutEffect, type FC } from 'react'
import { Form } from 'antd'
import { Await, useLoaderData } from 'react-router-dom'
import useArtAddStore, {
  Move,
  selectArticleBase,
  setArticleBase,
  setCurrent,
} from '@/store/art-add-store'

const ArticleBase: FC = () => {
  const loaderData = useLoaderData() as {
    result: Promise<BaseResponse<CateItem[]>>
  }
  const baseForm = useArtAddStore(selectArticleBase)
  const [formRef] = Form.useForm()
  // console.log(baseForm)
  // console.log(loaderData?.cates)
  useLayoutEffect(() => {
    formRef.setFieldsValue(baseForm)
  }, [baseForm, formRef])
  const onFinish = (values: unknown) => {
    console.log(values)
    setCurrent(Move.next)
  }
  const handleValuesChange: FormProps['onValuesChange'] = (
    changedValues: ArticleBaseForm,
  ) => {
    console.log(changedValues)
    setArticleBase(changedValues)
  }
  return (
    <div>
      <Form
        style={{ maxWidth: 600 }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        form={formRef}
        onValuesChange={handleValuesChange}>
        <Form.Item
          label="文章标题"
          name="title"
          rules={[{ required: true, message: '请输入文章标题' }]}>
          <Input
            placeholder="请输入文章标题"
            maxLength={30}
            showCount
            allowClear
          />
        </Form.Item>
        <Suspense
          fallback={
            <Form.Item
              label="文章分类"
              rules={[{ required: true, message: '请选择文章分类' }]}>
              <Select placeholder="请选择文章分类" options={[]} loading />
            </Form.Item>
          }>
          <Await resolve={loaderData.result}>
            {(result: BaseResponse<CateItem[]>) => {
              return (
                <>
                  <Form.Item
                    label="文章分类"
                    name="cate_id"
                    rules={[{ required: true, message: '请选择文章分类' }]}>
                    <Select
                      options={result.data}
                      placeholder="请选择文章分类"
                      allowClear
                      fieldNames={{ label: 'cate_name', value: 'id' }}
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
    </div>
  )
}

export default ArticleBase
