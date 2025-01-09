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

interface BaseResponse {
  code: number;
  message: string;
}
interface LoginResponse extends BaseResponse {
  token: string;
}