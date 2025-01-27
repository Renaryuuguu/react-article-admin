import { Button, Result, Spin } from 'antd'
import { useEffect, useState, type FC } from 'react'
import { useAsyncError, useRevalidator } from 'react-router-dom'

const LoaderErrorElement: FC = () => {
  const revalidator = useRevalidator()
  const [reloading, setReloading] = useState(false)
  const error = useAsyncError()
  const handleReload = () => {
    revalidator.revalidate()
    setReloading(true)
  }
  useEffect(() => {
    if (error) {
      setReloading(false)
    }
  }, [error])
  return (
    <Spin spinning={reloading}>
      <Result
        status="warning"
        title="数据加载失败，请稍后再试！"
        extra={
          <Button type="primary" onClick={handleReload}>
            重新加载
          </Button>
        }
      />
    </Spin>
  )
}

export default LoaderErrorElement
