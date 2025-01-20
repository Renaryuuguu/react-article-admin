/// <reference types="vite/client" />
// -----------请求体数据类型---------
// 必须是type?
type RegForm = {
  username: string;
  password: string;
  repassword: string;
};
type LoginForm = Omit<RegForm, "repassword">

interface BaseResponse {
  code: number;
  message: string;
}

// -----------接口返回数据类型---------

interface BaseResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}
interface LoginResponse extends BaseResponse {
  token: string;
}

type User = {
  readonly id: string;
  username: string;
  nickname?: string;
  email: string;
  user_pic?: string;
}

type MenuItem = {
  readonly key: string;
  title?: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[]
}

type UserInfo = Pick<User, "id" | "email" | "nickname">

type resetPwdForm = {
  old_pwd: string;
  new_pwd: string;
  re_pwd: string;
}

type CateItem = {
  readonly id: number,
  cate_name: string,
  cate_alias: string
}

type ArticleAddForm = {
  title: string,
  cate_id: string,
  content: string,
  state: '已发布' | '草稿',
  cover_img: Blob,
  [key: string]: string | Blob
}

type ArticleBaseForm = Partial<Pick<ArticleAddForm, 'title' | 'cate_id'>>