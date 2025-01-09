import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState = {
  token: ''
}

type AppStoreType = typeof initialState

const useAppStore = create<AppStoreType>()(
  immer(
    devtools(
      persist(
        () => {
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

export default useAppStore