import axios, { AxiosRequestConfig } from "axios";
import { API_URL, HEADER } from "../config";
import { Fetch, FetchResponse } from "../types";

const useAxios = async <T>({

  endpoint,
  feature,
  method,
  body,
  accessToken,
  includeToken = false,
}: Fetch): Promise<FetchResponse<T>> => {
  
  const url = `${API_URL}${
    includeToken ? "private" : "public"
  }/${feature}/${endpoint}`;

  try {
    const axiosConfig: AxiosRequestConfig = {
      method: method,
      url,
      headers: {
        "Content-Type": "application/json",
        ...(includeToken && { [HEADER]: accessToken }),
      },
      data: body,
    };

    const res = await axios(axiosConfig);

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as FetchResponse<T>;
    }
    return {
      status: false,
      message: "An unexpected error occurred",
      data: null as unknown as T,
    };
  }
};

export default useAxios;
