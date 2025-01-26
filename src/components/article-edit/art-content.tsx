import { Move } from '@/store/art-add-store'
import useArticleEditStore, {
  selectContent,
  selectShowDraft,
  setArticleContent,
  setArticleState,
  updateCurrent,
} from '@/store/art-edit-store'
import { Button, message, Space, Spin } from 'antd'
import { useRef, type FC } from 'react'
import { modules } from '../article-add/art-content'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from '../article-add/css/art-content.module.less'
import { useSubmit } from 'react-router-dom'
import { useNavSubmitting } from '@/utils/hooks'
const EditContent: FC = () => {
  const content = useArticleEditStore(selectContent)
  const submit = useSubmit()
  const submitting = useNavSubmitting('PUT')
  const isShowDraft = useRef(useArticleEditStore(selectShowDraft))
  const publish = (state: '草稿' | '已发布') => {
    if (!content || content === '<p><br></p>')
      return message.error('请填写文章的内容！')
    setArticleState(state)
    submit(null, { method: 'PUT', navigate: false })
  }
  return (
    <div className={styles.artContent}>
      <Spin spinning={submitting} delay={200}>
        <Space direction="vertical">
          <ReactQuill
            onChange={setArticleContent}
            theme="snow"
            value={content}
            modules={modules}
          />
          <Space direction="horizontal">
            <Button type="primary" onClick={() => updateCurrent(Move.prev)}>
              上一步
            </Button>
            <Button
              type="primary"
              onClick={() => publish('草稿')}
              style={{ display: isShowDraft.current ? '' : 'none' }}>
              存为草稿
            </Button>
            <Button type="primary" onClick={() => publish('已发布')}>
              发布
            </Button>
          </Space>
        </Space>
      </Spin>
    </div>
  )
}

export default EditContent
