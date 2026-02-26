import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { mockMonthlyExpenses } from "@/src/lib/mock-data";

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-bold text-foreground">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}

export function ExpenseChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Monthly Expenses
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Last 6 months overview
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockMonthlyExpenses} barSize={36}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(40 10% 85%)"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(210 5% 45%)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(210 5% 45%)", fontSize: 12 }}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "hsl(40 15% 92% / 0.7)" }}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(82 45% 40%)" />
                  <stop offset="100%" stopColor="hsl(82 35% 32%)" />
                </linearGradient>
              </defs>
              <Bar
                dataKey="amount"
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
