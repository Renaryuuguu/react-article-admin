import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { useMemo, type FC } from 'react'
import ArticleEditBtn from './btn-edit'
import ArticleDelBtn from './btn-del'
import { useSearchParams } from 'react-router-dom'
import IndexOrder from './index-order'

const columns: TableProps<Article>['columns'] = [
  {
    title: '序号',
    render: (_, __, index) => {
      return <IndexOrder index={index} />
    },
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '分类',
    dataIndex: 'cate_name',
  },
  {
    title: '发布时间',
    dataIndex: 'pub_date',
    render: (value) => {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
  },
  {
    title: '操作',
    render: (_, record) => {
      return (
        <>
          <ArticleEditBtn id={record.id} />
          <ArticleDelBtn id={record.id} />
        </>
      )
    },
  },
]
type Props = TableProps & Partial<{ total: number } & ArticleListQuery>
const ArticleListTable: FC<Props> = (props) => {
  const [, setSearchParams] = useSearchParams()
  const pageOptions: TableProps<Article>['pagination'] = useMemo(() => {
    return {
      total: props.total,
      current: props.pagenum,
      pageSize: props.pagesize,
      pageSizeOptions: [2, 3, 5, 10, 20],
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal(total) {
        return `共${total}条数据`
      },
      onChange(page, pageSize) {
        console.log('page', page, 'pageSize', pageSize)
        setSearchParams({
          pagenum: page,
          pagesize: pageSize,
          state: props.state,
          cate_id: props.cate_id,
        } as unknown as {
          [key: string]: string
        })
      },
    }
  }, [props, setSearchParams])
  return <Table {...props} columns={columns} pagination={pageOptions} />
}

export default ArticleListTable
