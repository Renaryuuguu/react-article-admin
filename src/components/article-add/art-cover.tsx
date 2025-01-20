import useArtAddStore, {
  Move,
  selectArticleCover,
  setArticleCover,
  setCurrent,
} from '@/store/art-add-store'
import { Avatar, Button, message, Space } from 'antd'
import React, { useRef, type FC } from 'react'

const ArticleCover: FC = () => {
  const iptRef = useRef<HTMLInputElement>(null)
  const coverURL = useArtAddStore(selectArticleCover)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files || files.length === 0) return

    if (files[0].size > 2 * 1024 * 1024)
      return message.error('封面图片大小不能超过2M！')
    // console.dir(files[0])
    // const fr = new FileReader()
    // fr.readAsDataURL(files[0])
    // fr.onload = () => {
    //   console.log(fr.result)
    // }
    setArticleCover(files[0])
  }
  const handleNext = () => {
    if (!coverURL) return message.error('请选择文章封面！')
    setCurrent(Move.next)
  }
  return (
    <Space direction="vertical">
      {coverURL ? (
        <Avatar size={300} shape="square" src={coverURL} />
      ) : (
        <Avatar size={300} shape="square">
          请选择文章封面
        </Avatar>
      )}

      <Space direction="horizontal">
        <Button
          type="primary"
          onClick={() => {
            setCurrent(Move.prev)
          }}>
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
          ref={iptRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Space>
    </Space>
  )
}

export default ArticleCover
