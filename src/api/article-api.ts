import axios from '@/api'

export const postArticleApi = (data: FormData) => axios.post<null, BaseResponse>('/my/article/add', data)

export const getArticleListApi = (data: ArticleListQuery) => axios.get<null, ArticleListResponse>('/my/article/list', { params: data })

export const deleteArticleApi = (data: FormData) => axios.delete<null, BaseResponse>('/my/article/info', { params: data })