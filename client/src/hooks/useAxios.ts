import { HEADER } from "@/config";
import { Fetch, FetchResponse } from "@/types";
import { api } from "@/utils";
import axios, { AxiosRequestConfig } from "axios";

export const useAxios = async <T>({
  endpoint,
  feature,
  method,
  accessToken,
  callback,
  data,
  includeAccessToken,
}: Fetch): Promise<FetchResponse<T>> => {
  try {
    const url = `/api/${
      includeAccessToken === true ? "private" : "public"
    }/${feature}/${endpoint}`;

    const axiosConfig: AxiosRequestConfig = {
      method: method,
      url,
      headers: {
        "Content-Type": "application/json",
        ...(includeAccessToken && { [HEADER]: `Bearer ${accessToken}` }),
      },
      data,
      withCredentials: true,
    };

    const res = await api(axiosConfig);
    if (callback && res.data.status === true) {
      callback(res.data);
    }
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as FetchResponse<T>;
    }
    return {
      status: false,
      message: "useAxios ~> An unexpected error occurred",
      data: null as unknown as T,
    };
  }
};