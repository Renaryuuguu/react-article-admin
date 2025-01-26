import { Button } from 'antd'
import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ArticleEditBtn: FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <Button
      type="link"
      size="small"
      onClick={() =>
        navigate('/art-edit/' + id, {
          state: location.search,
        })
      }>
      编辑
    </Button>
  )
}
export default ArticleEditBtn
