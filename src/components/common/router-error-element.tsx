import { Button, Result } from 'antd'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const RouterErrorElement: FC = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          返回主页
        </Button>
      }
    />
  )
}

export default RouterErrorElement
