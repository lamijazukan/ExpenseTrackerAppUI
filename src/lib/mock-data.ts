// ============================================================
// MOCK DATA - Replace with API calls when backend is ready
// ============================================================

export interface Transaction {
  id: string
  date: string
  store: string
  amount: number
  paymentMethod: "Credit Card" | "Debit Card" | "Cash" | "Bank Transfer"
  category: string
  items: { name: string; amount: number; category: string }[]
}

export interface Category {
  id: string
  name: string
  icon: string
  budget: number
  spent: number
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  budget: number
  spent: number
}

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2026-02-05",
    store: "Bingo Supermarket",
    amount: 87.5,
    paymentMethod: "Credit Card",
    category: "Groceries",
    items: [
      { name: "Milk", amount: 3.5, category: "Groceries" },
      { name: "Bread", amount: 2.0, category: "Groceries" },
      { name: "Chicken", amount: 12.0, category: "Groceries" },
    ],
  },
  {
    id: "2",
    date: "2026-02-04",
    store: "Shell Gas Station",
    amount: 65.0,
    paymentMethod: "Debit Card",
    category: "Transport",
    items: [{ name: "Fuel", amount: 65.0, category: "Transport" }],
  },
  {
    id: "3",
    date: "2026-02-03",
    store: "Netflix",
    amount: 15.99,
    paymentMethod: "Credit Card",
    category: "Entertainment",
    items: [
      { name: "Monthly Subscription", amount: 15.99, category: "Entertainment" },
    ],
  },
  {
    id: "4",
    date: "2026-02-02",
    store: "City Pharmacy",
    amount: 34.2,
    paymentMethod: "Cash",
    category: "Health",
    items: [
      { name: "Vitamins", amount: 22.0, category: "Health" },
      { name: "Bandages", amount: 12.2, category: "Health" },
    ],
  },
  {
    id: "5",
    date: "2026-02-01",
    store: "H&M",
    amount: 129.99,
    paymentMethod: "Credit Card",
    category: "Shopping",
    items: [
      { name: "Jacket", amount: 89.99, category: "Shopping" },
      { name: "T-Shirt", amount: 40.0, category: "Shopping" },
    ],
  },
  {
    id: "6",
    date: "2026-01-30",
    store: "Restaurant Sarajevo",
    amount: 45.0,
    paymentMethod: "Cash",
    category: "Dining",
    items: [
      { name: "Dinner for 2", amount: 38.0, category: "Dining" },
      { name: "Drinks", amount: 7.0, category: "Dining" },
    ],
  },
  {
    id: "7",
    date: "2026-01-28",
    store: "Elektro BH",
    amount: 299.0,
    paymentMethod: "Bank Transfer",
    category: "Electronics",
    items: [
      { name: "Wireless Headphones", amount: 299.0, category: "Electronics" },
    ],
  },
  {
    id: "8",
    date: "2026-01-25",
    store: "Konzum",
    amount: 52.3,
    paymentMethod: "Debit Card",
    category: "Groceries",
    items: [
      { name: "Fruits", amount: 15.0, category: "Groceries" },
      { name: "Vegetables", amount: 12.3, category: "Groceries" },
      { name: "Snacks", amount: 25.0, category: "Groceries" },
    ],
  },
  {
    id: "9",
    date: "2026-01-22",
    store: "BH Telecom",
    amount: 40.0,
    paymentMethod: "Bank Transfer",
    category: "Utilities",
    items: [
      { name: "Internet + Phone Plan", amount: 40.0, category: "Utilities" },
    ],
  },
  {
    id: "10",
    date: "2026-01-20",
    store: "Gym Center",
    amount: 30.0,
    paymentMethod: "Debit Card",
    category: "Health",
    items: [
      { name: "Monthly Gym Membership", amount: 30.0, category: "Health" },
    ],
  },
]

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Groceries",
    icon: "ShoppingCart",
    budget: 500,
    spent: 139.8,
    subcategories: [
      { id: "1-1", name: "Fresh Produce", budget: 150, spent: 27.3 },
      { id: "1-2", name: "Dairy & Eggs", budget: 100, spent: 3.5 },
      { id: "1-3", name: "Meat & Seafood", budget: 120, spent: 12.0 },
      { id: "1-4", name: "Snacks & Beverages", budget: 80, spent: 25.0 },
    ],
  },
  {
    id: "2",
    name: "Transport",
    icon: "Car",
    budget: 200,
    spent: 65.0,
    subcategories: [
      { id: "2-1", name: "Fuel", budget: 150, spent: 65.0 },
      { id: "2-2", name: "Parking", budget: 30, spent: 0 },
      { id: "2-3", name: "Public Transit", budget: 20, spent: 0 },
    ],
  },
  {
    id: "3",
    name: "Entertainment",
    icon: "Film",
    budget: 100,
    spent: 15.99,
    subcategories: [
      { id: "3-1", name: "Streaming", budget: 40, spent: 15.99 },
      { id: "3-2", name: "Movies & Events", budget: 60, spent: 0 },
    ],
  },
  {
    id: "4",
    name: "Health",
    icon: "Heart",
    budget: 200,
    spent: 64.2,
    subcategories: [
      { id: "4-1", name: "Pharmacy", budget: 100, spent: 34.2 },
      { id: "4-2", name: "Fitness", budget: 50, spent: 30.0 },
      { id: "4-3", name: "Doctor Visits", budget: 50, spent: 0 },
    ],
  },
  {
    id: "5",
    name: "Shopping",
    icon: "ShoppingBag",
    budget: 300,
    spent: 129.99,
    subcategories: [
      { id: "5-1", name: "Clothing", budget: 200, spent: 129.99 },
      { id: "5-2", name: "Accessories", budget: 100, spent: 0 },
    ],
  },
  {
    id: "6",
    name: "Dining",
    icon: "Utensils",
    budget: 150,
    spent: 45.0,
    subcategories: [
      { id: "6-1", name: "Restaurants", budget: 100, spent: 38.0 },
      { id: "6-2", name: "Cafes & Drinks", budget: 50, spent: 7.0 },
    ],
  },
  {
    id: "7",
    name: "Electronics",
    icon: "Laptop",
    budget: 400,
    spent: 299.0,
    subcategories: [
      { id: "7-1", name: "Gadgets", budget: 300, spent: 299.0 },
      { id: "7-2", name: "Software", budget: 100, spent: 0 },
    ],
  },
  {
    id: "8",
    name: "Utilities",
    icon: "Zap",
    budget: 150,
    spent: 40.0,
    subcategories: [
      { id: "8-1", name: "Internet & Phone", budget: 60, spent: 40.0 },
      { id: "8-2", name: "Electricity", budget: 50, spent: 0 },
      { id: "8-3", name: "Water", budget: 40, spent: 0 },
    ],
  },
]

export interface Expense {
  id: string
  productName: string
  amount: number
  category: string
  transactionId: string
  transactionStore: string
  transactionDate: string
}

// Flatten all expense items from transactions
export const mockExpenses: Expense[] = mockTransactions.flatMap((tx) =>
  tx.items.map((item, idx) => ({
    id: `${tx.id}-${idx}`,
    productName: item.name,
    amount: item.amount,
    category: item.category,
    transactionId: tx.id,
    transactionStore: tx.store,
    transactionDate: tx.date,
  }))
)

export const mockMonthlyExpenses = [
  { month: "Sep", amount: 1820 },
  { month: "Oct", amount: 2150 },
  { month: "Nov", amount: 1940 },
  { month: "Dec", amount: 2680 },
  { month: "Jan", amount: 1590 },
  { month: "Feb", amount: 798.98 },
]

export const mockSummary = {
  totalBudget: 2000,
  totalExpense: 798.98,
  totalSavings: 1201.02,
  budgetChange: 0,
  expenseChange: -12.4,
  savingsChange: 8.6,
}
