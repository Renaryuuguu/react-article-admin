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
import { message, Steps } from 'antd'
import type { FC } from 'react'
import { StorageValue } from 'zustand/middleware'
const items = [
  { title: '基本信息' },
  { title: '文章封面' },
  { title: '文章内容' },
  { title: 'Done' },
]
const ArticleAdd: FC = () => {
  const current = useArtAddStore(selectCurrent)
  const hydrated = useArtAddStore(selectHydrated)
  return (
    hydrated && (
      <div>
        <Steps items={items} current={current} size="small"></Steps>

        <div style={{ marginTop: 20 }}>
          {current === ArticleSteps.base && <ArticleBase />}
          {current === ArticleSteps.cover && <ArticleCover />}
          {current === ArticleSteps.content && <ArticleContent />}
          {current === ArticleSteps.done && <ArticleResult />}
          {/* <Button onClick={() => setCurrent((current) => current - 1)}>
          上一步
        </Button>
        <Button
          onClick={() => setCurrent((current) => current + 1)}
          type="primary">
          下一步
        </Button> */}
        </div>
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
