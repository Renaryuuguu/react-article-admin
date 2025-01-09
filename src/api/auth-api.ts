import axios from "@/api";
// import qs from "qs";
export const regApi = (data: FormData) => axios.post<null, BaseResponse>("/api/reg", data);
export const loginApi = (data: FormData) => axios.post<null, LoginResponse>("/api/login", data);
// export const regApi = (data: RegForm) =>
//   axios.post("/api/reg", qs.stringify(data));
// export const regApi = (data: string) => axios.post("/api/reg", data);
