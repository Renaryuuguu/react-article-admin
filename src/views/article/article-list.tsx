import { deleteArticleApi, getArticleListApi } from '@/api/article-api'
import { getCateListApi } from '@/api/cate-api'
import ArticleListSearch from '@/components/article-list/list-search'
import ArticleListTable from '@/components/article-list/list-table'
import { useNavLoading } from '@/utils/hooks'
import { Button, Flex, message, Space } from 'antd'
import type { FC } from 'react'
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'

const ArticleList: FC = () => {
  const navigate = useNavigate()
  const loaderData = useLoaderData() as {
    list: Article[]
    total: number
    queryParam: ArticleListQuery
  } | null
  const location = useLocation()
  const loading = useNavLoading('DELETE', location.pathname + location.search)
  console.log(loaderData?.list)
  return (
    <div>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Flex justify="space-between">
          <ArticleListSearch />
          <Button type="primary" onClick={() => navigate('/art-add')}>
            添加文章
          </Button>
        </Flex>
        <ArticleListTable
          rowKey="id"
          dataSource={loaderData?.list || []}
          size="middle"
          bordered
          total={loaderData?.total}
          {...loaderData?.queryParam}
          loading={loading}
        />
      </Space>
    </div>
  )
}
export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const res = await getCateListApi()
    // console.log(request.url)
    const searchParams = new URL(request.url).searchParams
    // console.log(searchParams.get('cate_id'))
    // console.log(searchParams.get('state'))
    const queryParam = {
      pagenum: Number(searchParams.get('pagenum')) || 1,
      pagesize: Number(searchParams.get('pagesize')) || 10,
      cate_id: Number(searchParams.get('cate_id')) || '',
      state: searchParams.get('state') || '',
    }
    const res2 = await getArticleListApi(queryParam)
    return { cates: res.data, queryParam, list: res2.data, total: res2.total }
  } catch (error) {
    return null
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData()
  try {
    await deleteArticleApi(data)
    message.success('删除成功')
    const needBack = data.get('needBack')
    if (needBack === 'true') {
      const url = new URL(request.url)
      const newPage = Number(url.searchParams.get('pagenum')) - 1
      url.searchParams.set('pagenum', String(newPage))
      return redirect(url.toString())
    }

    return true
  } catch (error) {
    return null
  }
}

export default ArticleList
