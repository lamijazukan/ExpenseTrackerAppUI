export interface BudgetCurrentStatus {
    totalAmount: number;
    spentAmount: number;
    remainingAmount: number;
    isExceeded: boolean;
    isNearLimit: boolean;
}