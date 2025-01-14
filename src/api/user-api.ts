import axios from "@/api"

export const getUserApi = () => axios.get<null, BaseResponse<User>>('/my/userinfo')

export const getMenuApi = () => axios.get<null, BaseResponse<MenuItem>>("/my/menus")

export const updateUserApi = (data: FormData) => axios.put<null, BaseResponse>('/my/userinfo', data)

export const updatePwdApi = (data: FormData) => axios.patch<null, BaseResponse>('/my/updatepwd', data)