import axios from "axios";
import type { AxiosError } from "axios";
import config from "@/config.json";
import qs from "qs";
import { message } from "antd";
import useAppStore from "@/store/app-store";
import { resetAllStore } from "@/store/resetter";
const instance = axios.create({
  baseURL: config.baseURL,
  // timeout: 1000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-api-key": "ab428ee8-c6ae-4bee-86ca-a5bd3437cff5",
  },
});

instance.interceptors.request.use(
  (config) => {
    const url = config.url;
    const method = config.method?.toUpperCase();

    if (
      (method === "POST" && url === "/my/article/add") ||
      (method === "PUT" && url === "/my/article/info")
    ) {
      config.transformRequest = [];
    } else {
      config.transformRequest = requestTransformer;
    }

    config.paramsSerializer = {
      serialize(params) {
        console.log(params)
        if (params instanceof FormData)
          return qs.stringify(Object.fromEntries(params))
        else return qs.stringify(params)
      }
    }

    const token = useAppStore.getState().token;
    if (url?.includes("/my") && token) {
      config.headers.Authorization = token
    }
    console.log(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const requestTransformer = (data: FormData) => {
  if (data instanceof FormData) {
    const obj = Object.fromEntries(data);
    console.log(obj)
    return qs.stringify(obj);
  } else {
    return qs.stringify(data);
  }
  // return qs.stringify(data);
};

instance.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    } else {
      return { code: 0, message: response.statusText }
    }
    // return response
  },
  (error: AxiosError<{ code: number; message: string }>) => {
    console.log(error);
    // message.error(error?.response?.data?.message ?? "未知错误");

    if (error.response && error.response.data) {
      const token = useAppStore.getState().token;
      if (error.response.status === 401) {
        if (token) {
          message.error("登录过期，请重新登录！")
          resetAllStore();
        }
      } else {
        message.error(error.response.data.message);
      }


      return Promise.reject(error.response.data);
    } else {
      let msg = "";
      switch (error.code) {
        case "ERR_NETWORK":
          msg = "网络断开，请检查网络连接";
          break;
        case "ECONNABORTED":
          msg = "请求超时";
          break;
        default:
          msg = error.message;
          break;
      }
      message.error(msg);
      return Promise.reject({ code: 1, message: error.message })
    }
  }
);
export default instance;
