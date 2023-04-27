import { ITokenTypes } from "#/types";

export const storeToken = (tokens: ITokenTypes) => {
  localStorage.setItem("access", tokens.access);
  localStorage.setItem("refresh", tokens.refresh);
};

export const getToken = () => {
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");
  return { access, refresh };
};

export const removeToken = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  return true;
};
