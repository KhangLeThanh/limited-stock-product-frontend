import baseApi from "./baseApi";

export const login = async (username: string, password: string) => {
  const res = await baseApi.post("/auth/login", { username, password });
  return res.data;
};
