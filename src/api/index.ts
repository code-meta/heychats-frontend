import { API_URL } from "#/config";
import { getToken, storeToken } from "#/services/token";
import { ILoginUser, NewUser } from "#/types";
import axios, { AxiosError, AxiosResponse } from "axios";

const api_public = axios.create({
  baseURL: `${API_URL}`,
});

export const api_private = axios.create({
  baseURL: `${API_URL}`,
});

api_private.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      originalRequest.__isRetryRequest = true;

      try {
        const tokenResponse = await axios.post(
          `${API_URL}auth/token/refresh/`,
          {
            refresh: getToken().refresh,
          }
        );

        const newAccessToken = tokenResponse.data.access;

        storeToken(tokenResponse.data);

        api_private.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api_private.request(originalRequest);
      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export const createUser = async (data: NewUser): Promise<AxiosResponse> => {
  return await api_public.post("/auth/create-account/", data);
};

export const uploadUserProfile = async (
  data: unknown
): Promise<AxiosResponse> => {
  const res = await api_private.put("/auth/upload-profile/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return res;
};

export const loginUser = async (data: ILoginUser): Promise<AxiosResponse> => {
  return await api_public.post("/auth/login/", data);
};

export const getUserInfo = async (): Promise<AxiosResponse> => {
  return await api_private.get("/auth/user-info/", {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
};
