import { PersistStorage } from "zustand/middleware"
import localforage from "@/utils/localforage.ts"


export const createStorage = <T>() => {
  const storage: PersistStorage<T> = {
    getItem(name) {
      return localforage.getItem(name)
    },
    setItem(name, value) {
      localforage.setItem(name, value)
    },
    removeItem(name) {
      localforage.removeItem(name)
    }
  }
  return storage
}
