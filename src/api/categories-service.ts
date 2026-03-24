import api from "./apiClient";
import { CategoryFormData, CategoryResponse, CategoryTree } from "../types/category-types";

export const getCategories = async () : Promise<CategoryResponse[]> => {
  const response = await api.get<CategoryResponse[]>("/categories");
  return response.data;
};

export const getCategoryTree = async () : Promise<CategoryTree[]> => {
  const response = await api.get<CategoryTree[]>("/categories/tree");
  return response.data;
};

export const createCategory = async (data: CategoryFormData) : Promise<CategoryResponse> => {
  const response = await api.post<CategoryResponse>("/categories", data);
  return response.data;
};

export const updateCategory = async (
  categoryId: number,
  data: CategoryFormData,
) : Promise<CategoryResponse> => {
  const response = await api.patch<CategoryResponse>(`/categories/${categoryId}`, data);
  return response.data;
};

export const deleteCategory = async (categoryId: number) : Promise<void> => {
  const response = await api.delete(`/categories/${categoryId}`);
};
