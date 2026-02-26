
import api from "./apiClient";


export const register = async (data: any) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const login = async (data: any ) => {
  const response = await api.post("/api/auth/login", data);

  const token = response.data.token;

  
  localStorage.setItem("token", token);

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

