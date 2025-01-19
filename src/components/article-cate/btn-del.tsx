import { useNavLoading, useNavSubmitting } from '@/utils/hooks'
import { Button, message, Popconfirm, PopconfirmProps } from 'antd'
import { useEffect, useState, type FC } from 'react'
import { useActionData, useSubmit } from 'react-router-dom'

const BtnDel: FC<{ id: number }> = ({ id }) => {
  const [open, setOpen] = useState(false)
  const submit = useSubmit()
  const submitting = useNavSubmitting('DELETE')
  const loading = useNavLoading('DELETE')
  const actionData = useActionData() as boolean | null
  useEffect(() => {
    if (actionData && loading) setOpen(false)
  }, [actionData, loading])
  const confirm = () => {
    if (id === 1 || id === 2) {
      return message.error('管理员不允许删除此分类！')
    }
    submit({ id }, { method: 'DELETE' })
  }
  const cancel = () => {
    setOpen(false)
  }
  const change: PopconfirmProps['onOpenChange'] = (isOpen, e) => {
    console.log(e?.currentTarget.dataset.type)
    const btnType = e?.currentTarget.dataset.type
    if (btnType !== 'btn-ok' && !isOpen) setOpen(false)
  }
  const handleDelete = () => {
    setOpen(true)
  }
  return (
    <Popconfirm
      open={open}
      title="操作提示"
      description="您确定删除此文章分类吗？"
      okText="确定"
      cancelText="取消"
      onCancel={cancel}
      onConfirm={confirm}
      onOpenChange={change}
      okButtonProps={{
        loading: submitting && { delay: 200 },
        'data-type': 'btn-ok',
      }}>
      <Button type="link" size="small" onClick={handleDelete}>
        删除
      </Button>
    </Popconfirm>
  )
}

export default BtnDel
