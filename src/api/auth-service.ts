
import api from "./apiClient";
import { LoginData, RegisterData } from "../types/auth-types";

export const register = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

  const token = response.data.token;

  
  localStorage.setItem("token", token);

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

