import { API_URL, HEADER } from "@/config";
import { useAxios } from "@/hooks";
import { accessToken } from "@/types";
import axios from "axios";

const api = axios.create({ baseURL: API_URL });

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await useAxios<accessToken>({
          endpoint: "refresh",
          feature: "auth",
          method: "GET",
        });

        if (res.status === true) {
          const { accessToken } = res.data;
          api.defaults.headers[HEADER] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } else {
          // await useAxios({
          //   endpoint: "logout",
          //   feature: "auth",
          //   method: "GET",
          // });
          // window.location.href = "/login";
          return Promise.reject(error);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
