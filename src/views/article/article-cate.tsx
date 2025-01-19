import {
  delCateApi,
  editCateApi,
  getCateListApi,
  postCateApi,
} from '@/api/cate-api'
import BtnAdd from '@/components/article-cate/btn-add'
import BtnDel from '@/components/article-cate/btn-del'
import BtnEdit from '@/components/article-cate/btn-edit'
import { Button, message, Space, Table, TableProps } from 'antd'
import type { FC } from 'react'
import { ActionFunctionArgs, useLoaderData } from 'react-router-dom'

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
  const loaderData = useLoaderData() as { cates: CateItem[] } | null
  // console.log(loaderData)
  return (
    loaderData && (
      <Space direction="vertical" style={{ display: 'flex' }}>
        <BtnAdd />
        <Table
          dataSource={loaderData?.cates}
          columns={columns}
          size="middle"
          rowKey="id"
          pagination={false}
          bordered
        />
      </Space>
    )
  )
}
export const loader = async () => {
  try {
    const res = await getCateListApi()
    return { cates: res.data }
  } catch (error) {
    null
  }
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
