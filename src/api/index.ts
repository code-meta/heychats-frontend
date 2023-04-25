import { API_URL } from "#/config";
import { NewUser } from "#/types";
import axios, { AxiosResponse } from "axios";

const api_public = axios.create({
  baseURL: `${API_URL}`,
});

export const createUser = async (data: NewUser): Promise<AxiosResponse> => {
  const res = await api_public.post("/auth/create-account/", data);
  return res;
};
