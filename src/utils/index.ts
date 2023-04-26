interface ITokenTypes {
  refresh: string;
  access: string;
}

export const storeToken = (tokens: ITokenTypes) => {
  localStorage.setItem("access", tokens.access);
  localStorage.setItem("refresh", tokens.refresh);
};
