import api from "./apiClient";
import { BudgetCurrentStatus } from "../types/statistics-types";


export const getBudgetCurrentStatus = async (budgetId: number): Promise<BudgetCurrentStatus> => {
    const response = await api.get<BudgetCurrentStatus>(`/statistics/budget/${budgetId}`);
    return response.data;
};