import { resetCurrent } from '@/store/art-add-store'
import { Button, Result } from 'antd'
import type { FC } from 'react'
import { useActionData, useNavigate } from 'react-router-dom'

const ArticleResult: FC = () => {
  const navigate = useNavigate()
  const actionData = useActionData() as { msg: string } | null
  console.log(actionData)
  const gotoList = () => {
    navigate('/art-list')
    resetCurrent()
  }
  return (
    <div>
      <Result
        status="success"
        title={actionData ? actionData.msg : '文章发表成功！'}
        extra={[
          <Button type="primary" key="list" onClick={gotoList}>
            去文章列表
          </Button>,
          <Button key="rewrite" onClick={() => resetCurrent()}>
            再写一篇
          </Button>,
        ]}
      />
    </div>
  )
}

export default ArticleResult
