import { API_URL } from "#/config";
import { getToken, removeToken, storeToken } from "#/services/token";
import { ICreateConnection, ILoginUser, Iconnection, NewUser } from "#/types";
import axios, { AxiosError, AxiosResponse } from "axios";

// ! this api instance is for public routes without authentication
const api_public = axios.create({
  baseURL: `${API_URL}`,
});

// ! this api instance is for private routes with authentication
export const api_private = axios.create({
  baseURL: `${API_URL}`,
});

// ! interceptors to get new access and refresh token using refresh token
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
          removeToken();
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

// ! cerate new user
export const createUser = async (data: NewUser): Promise<AxiosResponse> => {
  return await api_public.post("/auth/create-account/", data);
};

// ! upload a profile picture for an user
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

// ! authenticate the user and send jwt tokens to login
export const loginUser = async (data: ILoginUser): Promise<AxiosResponse> => {
  return await api_public.post("/auth/login/", data);
};

// ! it gives basic informations for an authenticate user
export const getUserInfo = async (): Promise<AxiosResponse> => {
  return await api_private.get("/auth/user-info/", {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
};

// ! this handler finds connection to create new chat
export const findConnection = async (
  data: Iconnection
): Promise<AxiosResponse> => {
  return await api_private.post("/chat/find-chat-connection/", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
};

// ! this handler finds connection to create new chat
export const createConnection = async (
  data: ICreateConnection
): Promise<AxiosResponse> => {
  return await api_private.post("/chat/create-connection/", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
};
