import {
  delCateApi,
  editCateApi,
  getCateListApi,
  postCateApi,
} from '@/api/cate-api'
import BtnAdd from '@/components/article-cate/btn-add'
import BtnDel from '@/components/article-cate/btn-del'
import BtnEdit from '@/components/article-cate/btn-edit'
import LoaderErrorElement from '@/components/common/loader-error-element'
import { delay } from '@/utils'
import { message, Space, Table, TableProps } from 'antd'
import { Suspense, type FC } from 'react'
import {
  ActionFunctionArgs,
  Await,
  defer,
  useLoaderData,
} from 'react-router-dom'

const columns: TableProps<CateItem>['columns'] = [
  {
    title: '序号',
    render: (_, __, index) => index + 1,
  },
  {
    title: '分类名称',
    dataIndex: 'cate_name',
  },
  {
    title: '分类别名',
    dataIndex: 'cate_alias',
  },
  {
    title: '操作',
    render: (_, record) => {
      return (
        <Space direction="horizontal">
          <BtnEdit cate={record} />
          <BtnDel id={record.id} />
        </Space>
      )
    },
  },
]

const ArticleCate: FC = () => {
  const loaderData = useLoaderData() as {
    result: Promise<BaseResponse<CateItem[]>>
  }
  // console.log(loaderData)
  return (
    <Suspense fallback={<Table loading={true} />}>
      <Await resolve={loaderData.result} errorElement={<LoaderErrorElement />}>
        {(result: BaseResponse<CateItem[]>) => {
          return (
            <Space direction="vertical" style={{ display: 'flex' }}>
              <BtnAdd />
              <Table
                dataSource={result.data}
                columns={columns}
                size="middle"
                rowKey="id"
                pagination={false}
                bordered
              />
            </Space>
          )
        }}
      </Await>
    </Suspense>
  )
}
export const loader = async () => {
  const result = getCateListApi()
  // return defer({ result: delay(20) })
  return defer({ result })
}
export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData()
  const method = request.method.toUpperCase() as
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
  if (method === 'POST') {
    try {
      await postCateApi(fd)
    } catch (error) {
      return null
    }
    message.success('添加成功')
  } else if (method === 'PUT') {
    try {
      await editCateApi(fd)
    } catch (error) {
      return null
    }
    message.success('修改成功')
  } else if (method === 'DELETE') {
    try {
      await delCateApi(fd)
    } catch (error) {
      return null
    }
    message.success('删除成功')
  }
  return true
}
export default ArticleCate
