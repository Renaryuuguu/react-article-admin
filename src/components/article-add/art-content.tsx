import useArtAddStore, {
  Move,
  selectArticleContent,
  setArticleContent,
  setArticleState,
  setCurrent,
} from '@/store/art-add-store'
import { Button, message, Space, Spin } from 'antd'
import { useState, type FC } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styels from './css/art-content.module.less'
import { useSubmit } from 'react-router-dom'
import { useNavSubmitting } from '@/utils/hooks'
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'],
  ],
}
const ArticleContent: FC = () => {
  // const [value, setValue] = useState('1')
  const value = useArtAddStore(selectArticleContent)
  const submit = useSubmit()
  const submitting = useNavSubmitting('POST')
  const publish = (state: '草稿' | '已发布') => {
    if (!value || value === '<p><br></p>')
      return message.error('请填写文章的内容！')
    console.log(value, state)
    setArticleState(state)
    submit(null, { method: 'POST' })
  }
  return (
    <div className={styels.artContent}>
      <Spin spinning={submitting} delay={200}>
        <Space direction="vertical" style={{ display: 'flex' }}>
          {/* <div>ArtContent</div> */}
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setArticleContent}
            modules={modules}
          />
          <Space direction="horizontal">
            <Button
              type="primary"
              onClick={() => {
                setCurrent(Move.prev)
              }}>
              上一步
            </Button>
            <Button type="primary" onClick={() => publish('草稿')}>
              存为草稿
            </Button>
            <Button type="primary" onClick={() => publish('已发布')}>
              下一步
            </Button>
          </Space>
        </Space>
      </Spin>
    </div>
  )
}

export default ArticleContent
