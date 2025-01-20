import { createStorage } from "@/utils/storage";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


export type ArtAddStore = {
  current: ArticleSteps
  article: ArticleAddForm
  _hasHydrated: boolean
}

export enum Move {
  next = 1,
  prev = -1
}

export enum ArticleSteps {
  base = 0,
  cover = 1,
  content = 2,
  done = 3
}

const initialState: ArtAddStore = {
  current: ArticleSteps.base,
  article: {} as ArticleAddForm,
  _hasHydrated: false
}

const useArtAddStore = create<ArtAddStore>()(
  immer(
    devtools(
      persist(
        () => {
          return {
            ...initialState
          }
        },
        {
          name: 'art-add-store',
          storage: createStorage<ArtAddStore>(),
          onRehydrateStorage: () => {
            return () => {
              useArtAddStore.setState(state => {
                state._hasHydrated = true
              })
            }
          },
        }
      ),
      { name: 'art-add-store' }
    )
  )
)
export default useArtAddStore;

export const setCurrent = (step: Move = Move.next) => {
  useArtAddStore.setState(state => {
    state.current += step
  })
}

export const setArticleBase = (formData: ArticleBaseForm) => {
  useArtAddStore.setState(state => {
    state.article = { ...state.article, ...formData }
  })
}

export const setArticleCover = (cover: Blob) => {
  useArtAddStore.setState(state => {
    state.article.cover_img = cover
  })
}
export const setArticleContent = (content: string) => {
  useArtAddStore.setState(state => {
    state.article.content = content
  })
}

export const setArticleState = (artState: '草稿' | '已发布') => {
  useArtAddStore.setState(state => {
    state.article.state = artState
  })
}

export const clearArticle = () => {
  useArtAddStore.setState(state => {
    state.article = {} as ArticleAddForm
  })
}

export const resetCurrent = () => {
  useArtAddStore.setState(state => {
    state.current = ArticleSteps.base
  })
}

export const selectCurrent = (state: ArtAddStore) => state.current;

export const selectArticleBase = (state: ArtAddStore) => ({ title: state.article.title, cate_id: state.article.cate_id })

export const selectArticleCover = (state: ArtAddStore) => {
  const cover = state.article.cover_img
  if (cover) {
    return URL.createObjectURL(cover)
  } else {
    return null
  }
}

export const selectHydrated = (state: ArtAddStore) => state._hasHydrated

export const selectArticleContent = (state: ArtAddStore) => state.article.content