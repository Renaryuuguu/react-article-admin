import { create } from "zustand";
import { ArticleSteps, Move } from "./art-add-store";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStorage } from "@/utils/storage";
import { getArticleApi } from "@/api/article-api";
import config from '@/config.json'
type EditStore = {
  article: ArticleEditForm,
  current: ArticleSteps
}

const initialState: EditStore = {
  article: {} as ArticleEditForm,
  current: ArticleSteps.base
}

const useArticleEditStore = create<EditStore>()(
  immer(
    devtools(
      persist(
        () => {
          return {
            ...initialState
          }
        },
        {
          name: 'art-edit-store',
          storage: createStorage(),
          partialize(state) {
            return {
              article: state.article
            }
          },
        }
      ),
      { name: 'art-edit-store' }
    )
  )
)

export const initialArticle = async (id: string) => {
  try {
    const res = await getArticleApi(id)
    useArticleEditStore.setState(state => {
      if (res.data) {
        state.article = res.data
      }
    })
  } catch (error) {
    return null
  }
}

export const updateBase = (values: ArticleEditBaseForm) => {
  useArticleEditStore.setState(state => {
    state.article = {
      ...state.article,
      ...values
    }
  })
}

export const updateCurrent = (step: Move = Move.next) => {
  useArticleEditStore.setState(state => {
    state.current += step
  })
}

export const resetCurrent = () => {
  useArticleEditStore.setState(state => {
    state.current = ArticleSteps.base
  })
}

export const setArticleCover = (cover: Blob) => {
  useArticleEditStore.setState(state => {
    state.article.cover_img = cover
  })
}

export const setArticleContent = (content: string) => {
  useArticleEditStore.setState(state => {
    state.article.content = content
  })
}

export const setArticleState = (artState: '草稿' | '已发布') => {
  useArticleEditStore.setState(state => {
    state.article.state = artState
  })
}



export const selectCurrent = (state: EditStore) => state.current

export const selectBase = (state: EditStore) => {
  return {
    title: state.article.title,
    cate_id: state.article.cate_id
  }
}

export const selectCover = (state: EditStore) => {
  const cover = state.article.cover_img
  if (cover) {
    if (typeof cover === 'string') {
      return config.baseURL + cover
    }
    return URL.createObjectURL(cover)
  } else {
    return null
  }
}

export const selectContent = (state: EditStore) => state.article.content

export const selectShowDraft = (state: EditStore) => state.article.state === '草稿'

export default useArticleEditStore