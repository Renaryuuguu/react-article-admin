import { useMemo, useRef, useState, type FC } from 'react'
import { Avatar, Button, message, Space } from 'antd'
import useUserStore, { selectAvatar } from '@/store/user-store'
import { ActionFunctionArgs, useSubmit } from 'react-router-dom'
import { updateAvatarApi } from '@/api/user-api'
import { useNavSubmitting } from '@/utils/hooks'
const UserAvatar: FC = () => {
  const avatar_url = useUserStore(selectAvatar)
  const iptRef = useRef<HTMLInputElement>(null)
  const [newAvatar, setNewAvatar] = useState('')
  const isDisabled = useMemo(() => {
    return !newAvatar || newAvatar === avatar_url
  }, [newAvatar, avatar_url])
  const submit = useSubmit()

  const submitting = useNavSubmitting('PATCH')
  const showDiaglog = () => {
    iptRef.current?.click()
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files || files.length === 0) return
    const fr = new FileReader()
    fr.readAsDataURL(files[0])
    fr.onload = () => {
      if (fr.result) setNewAvatar(fr.result as string)
    }
  }
  const saveAvatar = () => {
    if (submitting) return
    submit({ avatar: newAvatar }, { method: 'PATCH' })
  }
  return (
    <Space direction="vertical">
      {newAvatar || avatar_url ? (
        <Avatar src={newAvatar || avatar_url} size={300} shape="square" />
      ) : (
        <Avatar size={300} shape="square" onClick={showDiaglog}>
          请选择头像
        </Avatar>
      )}
      <Space direction="horizontal">
        <Button onClick={showDiaglog}>选择头像</Button>
        <Button
          type="primary"
          disabled={isDisabled}
          onClick={saveAvatar}
          loading={submitting && { delay: 200 }}>
          保存头像
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={iptRef}
          onChange={onFileChange}
          hidden
        />
      </Space>
    </Space>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData()
  try {
    await updateAvatarApi(fd)
  } catch (error) {
    return null
  }
  message.success('头像更新成功')
  return null
}
export default UserAvatar
