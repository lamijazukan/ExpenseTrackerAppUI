import api from "./apiClient";
import { Budget, BudgetResponse, BudgetsApiResponse } from "../types/budget-types";

export const getBudgets = async () : Promise<BudgetsApiResponse> => {
  const response = await api.get<BudgetsApiResponse>("/budgets");
  return response.data;
};

export const getBudgetById = async (budgetId: number) : Promise<BudgetResponse> => {
  const response = await api.get<BudgetResponse>(`/budgets/${budgetId}`);
  return response.data;
};

export const createBudget = async (data: Budget) : Promise<BudgetResponse> => {
  const response = await api.post<BudgetResponse>("/budgets", data);
  return response.data;
};

export const updateBudget = async (
  budgetId: number,
  data: Budget,
) : Promise<BudgetResponse> => {
  const response = await api.patch<BudgetResponse>(`/budgets/${budgetId}`, data);
  return response.data;
};

export const deleteBudget = async (budgetId: number) : Promise<void> => {
  const response = await api.delete(`/budgets/${budgetId}`);
};