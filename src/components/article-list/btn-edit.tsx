import { Button } from 'antd'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const ArticleEditBtn: FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate()
  return (
    <Button
      type="link"
      size="small"
      onClick={() => navigate('/art-edit/' + id)}>
      编辑
    </Button>
  )
}
export default ArticleEditBtn
