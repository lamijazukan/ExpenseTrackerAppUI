import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react"
import { Card, CardContent } from "@/app/components/ui/card"
import { mockSummary } from "@/app/lib/mock-data"

const cards = [
  {
    title: "Total Budget",
    value: mockSummary.totalBudget,
    change: mockSummary.budgetChange,
    icon: Wallet,
  },
  {
    title: "Total Expense",
    value: mockSummary.totalExpense,
    change: mockSummary.expenseChange,
    icon: TrendingDown,
  },
  {
    title: "Total Savings",
    value: mockSummary.totalSavings,
    change: mockSummary.savingsChange,
    icon: DollarSign,
  },
]

export function SummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => {
        const isPositive = card.change >= 0
        return (
          <Card key={card.title} className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-olive/10">
                <card.icon className="h-6 w-6 text-olive" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-card-foreground">
                    ${card.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  {card.change !== 0 && (
                    <span
                      className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? "text-olive" : "text-destructive"}`}
                    >
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {isPositive ? "+" : ""}
                      {card.change}%
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
