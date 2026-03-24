import { SummaryCards } from "@/src/components/dashboard/summary-cards";
import { ExpenseChart } from "@/src/components/dashboard/expense-chart";
import { RecentTransactions } from "@/src/components/dashboard/recent-transactions";
import { AddTransactionDialog } from "@/src/components/add-transaction-dialog";


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here is your financial overview.
          </p>
        </div>
        <AddTransactionDialog />
      </div>

      <SummaryCards />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ExpenseChart />
        </div>
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
}
