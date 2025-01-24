import { useNavLoading, useNavSubmitting } from '@/utils/hooks'
import { Button, Popconfirm, PopconfirmProps } from 'antd'
import { useEffect, useState, type FC } from 'react'
import {
  useActionData,
  useLoaderData,
  useLocation,
  useSubmit,
} from 'react-router-dom'

const ArticleDelBtn: FC<{ id: number }> = ({ id }) => {
  const [open, setOpen] = useState(false)
  const submit = useSubmit()
  const location = useLocation()
  const submitting = useNavSubmitting(
    'DELETE',
    location.pathname + location.search,
  )
  const loading = useNavLoading('DELETE', location.pathname + location.search)
  const actionData = useActionData() as null | boolean
  const loaderData = useLoaderData() as {
    queryParam: ArticleListQuery
    total: number
    list: Article[]
  } | null
  useEffect(() => {
    if (actionData && loading) {
      setOpen(false)
    }
  }, [actionData, loading])
  const onConfirm = () => {
    let needBack = false
    if (loaderData) {
      const { queryParam, total, list } = loaderData
      needBack =
        list.length === 1 &&
        queryParam.pagenum !== 1 &&
        queryParam.pagenum === Math.ceil(total / queryParam.pagesize)
    }
    submit({ id, needBack }, { method: 'DELETE' })
  }
  const handleOpenChange: PopconfirmProps['onOpenChange'] = (value, e) => {
    // if (!value) {
    //   setOpen(false)
    // }
    const btnType = e?.currentTarget.dataset.type
    if (!value && btnType !== 'btn-ok') {
      setOpen(false)
    }
  }

  return (
    <Popconfirm
      open={open}
      title="操作提示"
      description="您确认删除此文章吗？"
      okText="确认"
      cancelText="取消"
      onConfirm={onConfirm}
      onCancel={() => setOpen(false)}
      onOpenChange={handleOpenChange}
      okButtonProps={{
        'data-type': 'btn-ok',
        loading: submitting && { delay: 200 },
      }}>
      <Button type="link" size="small" onClick={() => setOpen(true)}>
        删除
      </Button>
    </Popconfirm>
  )
}

export default ArticleDelBtn
