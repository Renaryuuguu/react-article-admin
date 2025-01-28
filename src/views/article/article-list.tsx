import { deleteArticleApi, getArticleListApi } from '@/api/article-api'
import { getCateListApi } from '@/api/cate-api'
import ArticleListSearch from '@/components/article-list/list-search'
import ArticleListTable from '@/components/article-list/list-table'
import { Button, Flex, message, Skeleton, Space, Spin } from 'antd'
import { Suspense, useMemo, type FC } from 'react'
import {
  ActionFunctionArgs,
  Await,
  defer,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'

const ArticleList: FC = () => {
  const navigate = useNavigate()
  const loaderData = useLoaderData() as {
    result: Promise<[BaseResponse<CateItem[]>, ArticleListResponse]>
    queryParam: ArticleListQuery
  }
  const navigation = useNavigation()
  // const loading = useNavLoading('DELETE', location.pathname + location.search)
  const navLoading = useMemo(() => {
    return (
      navigation.location?.pathname === '/art-list' &&
      navigation.state === 'loading'
    )
  }, [navigation.location?.pathname, navigation.state])

  return (
    <Suspense fallback={<Skeleton active />}>
      <Await resolve={loaderData.result}>
        {(result: [BaseResponse<CateItem[]>, ArticleListResponse]) => {
          const artListResult = result[1]
          return (
            <Spin spinning={navLoading}>
              <Space direction="vertical" style={{ display: 'flex' }}>
                <Flex justify="space-between">
                  <ArticleListSearch />
                  <Button type="primary" onClick={() => navigate('/art-add')}>
                    添加文章
                  </Button>
                </Flex>
                <ArticleListTable
                  rowKey="id"
                  dataSource={artListResult.data}
                  size="middle"
                  bordered
                  total={artListResult.total}
                  {...loaderData?.queryParam}
                  // loading={navLoading}
                />
              </Space>
            </Spin>
          )
        }}
      </Await>
    </Suspense>
  )
}
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // try {
  //   const res = await getCateListApi()
  //   // console.log(request.url)
  //   const searchParams = new URL(request.url).searchParams
  //   // console.log(searchParams.get('cate_id'))
  //   // console.log(searchParams.get('state'))
  //   const queryParam = {
  //     pagenum: Number(searchParams.get('pagenum')) || 1,
  //     pagesize: Number(searchParams.get('pagesize')) || 10,
  //     cate_id: Number(searchParams.get('cate_id')) || '',
  //     state: searchParams.get('state') || '',
  //   }
  //   const res2 = await getArticleListApi(queryParam)
  //   return { cates: res.data, queryParam, list: res2.data, total: res2.total }
  // } catch (error) {
  //   return null
  // }
  const searchParams = new URL(request.url).searchParams
  const queryParam = {
    pagenum: Number(searchParams.get('pagenum')) || 1,
    pagesize: Number(searchParams.get('pagesize')) || 10,
    cate_id: Number(searchParams.get('cate_id')) || '',
    state: searchParams.get('state') || '',
  }
  const result = Promise.all([getCateListApi(), getArticleListApi(queryParam)])
  return defer({ result, queryParam })
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
