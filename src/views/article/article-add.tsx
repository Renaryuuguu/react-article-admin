import { postArticleApi } from '@/api/article-api'
import { getCateListApi } from '@/api/cate-api'
import ArticleBase from '@/components/article-add/art-base'
import ArticleContent from '@/components/article-add/art-content'
import ArticleCover from '@/components/article-add/art-cover'
import ArticleResult from '@/components/article-add/art-result'
import useArtAddStore, {
  ArtAddStore,
  ArticleSteps,
  clearArticle,
  resetCurrent,
  selectCurrent,
  selectHydrated,
  setCurrent,
} from '@/store/art-add-store'
import localforage from '@/utils/localforage'
import { FloatButton, message, Modal, Steps } from 'antd'
import { useEffect, useRef, type FC } from 'react'
import { StorageValue } from 'zustand/middleware'

import { ClearOutlined } from '@ant-design/icons'
const items = [
  { title: '基本信息' },
  { title: '文章封面' },
  { title: '文章内容' },
  { title: 'Done' },
]
const ArticleAdd: FC = () => {
  const current = useArtAddStore(selectCurrent)
  const hydrated = useArtAddStore(selectHydrated)
  const modalRef = useRef<() => void>()
  useEffect(() => {
    return () => modalRef.current && modalRef.current()
  }, [])
  const handleClean = () => {
    modalRef.current = Modal.confirm({
      title: '确认清空表单？',
      content: '此操作会清空表单中填写的所有数据，确认清空吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        clearArticle()
        resetCurrent()
        message.success('表单清空完毕！')
      },
    }).destroy
  }
  return (
    hydrated && (
      <div>
        <Steps items={items} current={current} size="small"></Steps>

        <div style={{ marginTop: 20 }}>
          {current === ArticleSteps.base && <ArticleBase />}
          {current === ArticleSteps.cover && <ArticleCover />}
          {current === ArticleSteps.content && <ArticleContent />}
          {current === ArticleSteps.done && <ArticleResult />}
        </div>
        <FloatButton
          type="primary"
          tooltip="清空表单"
          onClick={handleClean}
          icon={<ClearOutlined />}
        />
      </div>
    )
  )
}

export const loader = async () => {
  const localData =
    await localforage.getItem<StorageValue<ArtAddStore>>('art-add-store')
  const current = localData?.state.current
  // console.log(localData, current, 1)
  if (current === ArticleSteps.done) {
    resetCurrent()
  }
  try {
    const res = await getCateListApi()
    return { cates: res.data }
  } catch (error) {
    return null
  }
}

export const action = async () => {
  const article = useArtAddStore.getState().article
  const fd = new FormData()
  for (const key in article) {
    fd.append(key, article[key])
  }
  try {
    await postArticleApi(fd)
  } catch (error) {
    return null
  }
  setCurrent()
  const msg = article.state === '草稿' ? '草稿保存成功！' : '文章发表成功！'
  message.success(msg)
  clearArticle()
  return { msg }
}
export default ArticleAdd
