import { getUserApi } from "@/api/user-api";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type UserStoreType = typeof initialState

const initialState = {
  user: {} as User
}
const useUserStore = create<UserStoreType>()(
  immer(
    devtools(
      persist(() => {
        return {
          ...initialState
        }
      },
        { name: "user-store" }
      ),
      { name: "user-store" }
    )
  )
)

export const initUser = async () => {
  try {
    const res = await getUserApi();
    useUserStore.setState(state => {
      if (res.data) {
        state.user = res.data
      }
    })
  } catch (error) {
    return
  }

}
export const selectName = (state: UserStoreType) => state.user.nickname || state.user.username
export const selectAvatar = (state: UserStoreType) => state.user.user_pic
export default useUserStore;