import { globalVar } from "@/constants/env";
import axios, { type AxiosRequestConfig } from "axios";

export class NetworkLib {
  static create = (config?: AxiosRequestConfig) => {
    return axios.create({
      ...config,
      baseURL: globalVar.BASE_URL,
    });
  };
}
