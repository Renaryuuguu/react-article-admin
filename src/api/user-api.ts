import axios from "@/api"

export const getUserApi = () => axios.get<null, BaseResponse<User>>('/my/userinfo')

export const getMenuApi = () => axios.get<null, BaseResponse<MenuItem>>("/my/menus")