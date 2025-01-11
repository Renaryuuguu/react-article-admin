import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import resetters from "./resetter";

const initialState = {
  token: '',
  collapsed: false
}

type AppStoreType = typeof initialState

const useAppStore = create<AppStoreType>()(
  immer(
    devtools(
      persist(
        (set) => {
          resetters.push(() => set(initialState))
          return {
            ...initialState
          }
        },
        { name: 'app-store' }
      ),
      { name: 'app-store' }
    )
  )
)

export const setToken = (token: string) => {
  useAppStore.setState((state) => {
    state.token = token
  })
}
export const setCollapsed = (collapsed: boolean) => {
  useAppStore.setState((state) => {
    state.collapsed = collapsed
  })
}

export const selectCollapsed = (state: AppStoreType) => state.collapsed

export const selectToken = (state: AppStoreType) => state.token

export default useAppStore