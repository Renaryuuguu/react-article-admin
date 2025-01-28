import { Button, Result } from 'antd'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound: FC = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          返回主页
        </Button>
      }
    />
  )
}

export default PageNotFound
