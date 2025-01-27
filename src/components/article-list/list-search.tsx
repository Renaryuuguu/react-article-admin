import { Button, Form, Select } from 'antd'
import { useEffect, type FC } from 'react'
import { useAsyncValue, useLoaderData, useSearchParams } from 'react-router-dom'

const ArticleListSearch: FC = () => {
  const [, setParams] = useSearchParams()
  const [formRef] = Form.useForm()
  const loaderData = useLoaderData() as {
    queryParam: ArticleListQuery
  }
  const [artCateResult] = useAsyncValue() as [BaseResponse<CateItem[]>]
  useEffect(() => {
    formRef.setFieldsValue({
      cate_id: loaderData?.queryParam.cate_id,
      state: loaderData?.queryParam.state,
    })
  }, [formRef, loaderData?.queryParam])
  const onFinish = (values: Pick<ArticleListQuery, 'cate_id' | 'state'>) => {
    console.log('Received values of form: ', values)
    const params = {
      ...loaderData?.queryParam,
      ...values,
      pagenum: 1,
    } as unknown as { [key: string]: string }
    setParams(params)
  }
  // console.log(loaderData?.cates, loaderData?.queryParam)
  return (
    <Form form={formRef} layout="inline" onFinish={onFinish}>
      <Form.Item name="cate_id" label="分类">
        <Select
          placeholder="请选择"
          style={{ width: 180 }}
          options={
            artCateResult.data
              ? [{ cate_name: '请选择', id: '' }, ...artCateResult.data]
              : []
          }
          fieldNames={{
            label: 'cate_name',
            value: 'id',
          }}
        />
      </Form.Item>
      <Form.Item name="state" label="状态">
        <Select
          placeholder="请选择"
          options={[
            { label: '请选择', value: '' },
            { label: '已发布', value: '已发布' },
            { label: '草稿', value: '草稿' },
          ]}
          style={{ width: 180 }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="default" onClick={() => setParams()}>
          重置
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ArticleListSearch
