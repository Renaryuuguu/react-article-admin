import useArticleEditStore, {
  initialArticle,
  resetCurrent,
  selectCurrent,
  updateCurrent,
} from '@/store/art-edit-store'
import { message, Modal, Steps } from 'antd'
import { useCallback, useEffect, useRef, type FC } from 'react'
import {
  LoaderFunctionArgs,
  useBeforeUnload,
  useBlocker,
} from 'react-router-dom'
import { stepItems } from './article-add'
import EditBase from '@/components/article-edit/art-base'
import { ArticleSteps } from '@/store/art-add-store'
import { getCateListApi } from '@/api/cate-api'
import EditCover from '@/components/article-edit/art-cover'
import EditContent from '@/components/article-edit/art-content'
import { putArticleApi } from '@/api/article-api'
import EditResult from '@/components/article-edit/art-result'

const ArticleEdit: FC = () => {
  const current = useArticleEditStore(selectCurrent)
  useBeforeUnload(
    useCallback((e) => {
      e.preventDefault()
    }, []),
  )

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return (
      currentLocation.pathname !== nextLocation.pathname &&
      current !== ArticleSteps.done
    )
  })
  const modalRef = useRef<ReturnType<typeof Modal.confirm> | null>()
  useEffect(() => {
    if (blocker.state === 'blocked') {
      if (modalRef.current) return
      modalRef.current = Modal.confirm({
        title: '温馨提示',
        content: '您所做的更改将会丢失，是否确认离开当前页面？',
        okText: '确认离开',
        cancelText: '取消',
        onOk() {
          blocker.proceed()
        },
        onCancel() {
          blocker.reset()
          modalRef.current = null
        },
      })
    }
  })
  return (
    <div>
      <Steps items={stepItems} current={current} size="small" />

      <div style={{ marginTop: 20 }}>
        {current === ArticleSteps.base && <EditBase />}
        {current === ArticleSteps.cover && <EditCover />}
        {current === ArticleSteps.content && <EditContent />}
        {current === ArticleSteps.done && <EditResult />}
      </div>
    </div>
  )
}
export const loader = async ({ params }: LoaderFunctionArgs) => {
  await initialArticle(params.id!)
  try {
    const res = await getCateListApi()
    resetCurrent()
    return { cates: res.data }
  } catch (error) {
    return null
  }
}

export const action = async () => {
  const article = useArticleEditStore.getState().article
  const keys = ['id', 'title', 'cate_id', 'content', 'state', 'cover_img']
  const fd = new FormData()
  keys.forEach((value) => {
    fd.append(value, article[value])
  })
  try {
    await putArticleApi(fd)
  } catch (error) {
    return null
  }
  message.success('修改成功')
  updateCurrent()
  return null
}
export default ArticleEdit
