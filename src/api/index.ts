import { API_URL } from "#/config";
import { ILoginUser, NewUser } from "#/types";
import axios, { AxiosResponse } from "axios";

const api_public = axios.create({
  baseURL: `${API_URL}`,
});

export const api_private = axios.create({
  baseURL: `${API_URL}`,
});

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