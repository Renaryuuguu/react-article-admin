import { Move } from '@/store/art-add-store'
import useArticleEditStore, {
  selectCover,
  setArticleCover,
  updateCurrent,
} from '@/store/art-edit-store'
import { Avatar, Button, message, Space } from 'antd'
import React, { useRef, type FC } from 'react'

const EditCover: FC = () => {
  const cover = useArticleEditStore(selectCover)
  const iptRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files || files.length === 0) return
    if (files[0].size > 2 * 1024 * 1024)
      return message.error('封面图片大小不能超过2M！')
    setArticleCover(files[0])
  }
  const handleNext = () => {
    if (!cover) return message.error('请选择文章封面！')
    updateCurrent()
  }
  return (
    <Space direction="vertical">
      {cover ? (
        <Avatar size={300} shape="square" src={cover} />
      ) : (
        <Avatar size={300} shape="square">
          请选择文章封面
        </Avatar>
      )}

      <Space direction="horizontal">
        <Button type="primary" onClick={() => updateCurrent(Move.prev)}>
          上一步
        </Button>
        <Button type="primary" onClick={() => iptRef.current?.click()}>
          选择封面
        </Button>
        <Button type="primary" onClick={handleNext}>
          下一步
        </Button>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={iptRef}
          onChange={handleFileChange}
        />
      </Space>
    </Space>
  )
}
export default EditCover
