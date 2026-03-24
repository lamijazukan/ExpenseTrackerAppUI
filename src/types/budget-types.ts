export interface Budget {
    categoryId: number;
    amount: number;
    startDate: string;
    endDate: string;
}

export interface BudgetResponse {
    budgetId: number;
    categoryId: number;
    amount: number;
    startDate: string;
    endDate: string;
}

export interface BudgetsApiResponse {
  budgets: BudgetResponse[];
  totalCount: number;
}