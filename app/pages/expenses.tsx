'use client';

import React from "react"

import { useState, useMemo } from "react"
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Edit2,
  MoreHorizontal,
  Search,
  Trash2,
} from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table"
import { mockExpenses, type Expense } from "@/app/lib/mock-data"
import { AddTransactionDialog } from "@/app/components/add-transaction-dialog"

const PAGE_SIZE = 8

function EditExpenseDialog({
  expense,
  onSave,
  open,
  onOpenChange,
}: {
  expense: Expense
  onSave: (updated: Expense) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [productName, setProductName] = useState(expense.productName)
  const [amount, setAmount] = useState(expense.amount.toString())
  const [category, setCategory] = useState(expense.category)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!productName || !amount || !category) return
    onSave({
      ...expense,
      productName,
      amount: Number(amount),
      category,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card text-card-foreground sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Edit Expense</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the expense details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-1.5">
            <Label className="text-card-foreground text-sm">Product Name</Label>
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="border-border bg-secondary text-card-foreground"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-card-foreground text-sm">Amount ($)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="border-border bg-secondary text-card-foreground"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-card-foreground text-sm">Category</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="border-border bg-secondary text-card-foreground"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-card-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!productName || !amount || !category}
              className="bg-olive text-olive-foreground hover:bg-olive/90 disabled:opacity-40"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [search, setSearch] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [page, setPage] = useState(1)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  const filtered = useMemo(() => {
    return expenses.filter((exp) => {
      const matchesSearch =
        !search ||
        exp.productName.toLowerCase().includes(search.toLowerCase()) ||
        exp.category.toLowerCase().includes(search.toLowerCase()) ||
        exp.transactionStore.toLowerCase().includes(search.toLowerCase())

      const expDate = new Date(exp.transactionDate)
      const matchesFrom = !dateFrom || expDate >= new Date(dateFrom)
      const matchesTo = !dateTo || expDate <= new Date(dateTo)

      return matchesSearch && matchesFrom && matchesTo
    })
  }, [expenses, search, dateFrom, dateTo])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleEditExpense(updated: Expense) {
    setExpenses((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    )
    setEditingExpense(null)
  }

  function handleDeleteExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Expenses</h1>
          <p className="text-sm text-muted-foreground">
            View all individual expense items across your transactions.
          </p>
        </div>
        <AddTransactionDialog />
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            All Expenses
          </CardTitle>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by product, category, or store..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="border-border bg-muted pl-9 text-card-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value)
                    setPage(1)
                  }}
                  className="w-36 border-border bg-muted text-card-foreground text-sm"
                />
              </div>
              <span className="text-muted-foreground">to</span>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value)
                  setPage(1)
                }}
                className="w-36 border-border bg-muted text-card-foreground text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Product</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="text-muted-foreground">Transaction</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="w-12 text-muted-foreground">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No expenses found.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((exp) => (
                  <TableRow
                    key={exp.id}
                    className="border-border hover:bg-muted/50"
                  >
                    <TableCell className="font-medium text-card-foreground">
                      {exp.productName}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-olive/10 px-2.5 py-0.5 text-xs font-medium text-olive">
                        {exp.category}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-destructive">
                      -${exp.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-card-foreground">
                      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-card-foreground/70">
                        {exp.transactionStore}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(exp.transactionDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-card-foreground"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border-border bg-card text-card-foreground"
                        >
                          <DropdownMenuItem
                            className="cursor-pointer focus:bg-muted focus:text-card-foreground"
                            onClick={() => setEditingExpense(exp)}
                          >
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border" />
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive focus:bg-muted focus:text-destructive"
                            onClick={() => handleDeleteExpense(exp.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)} -{" "}
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="border-border text-card-foreground hover:bg-muted bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="border-border text-card-foreground hover:bg-muted bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {editingExpense && (
        <EditExpenseDialog
          expense={editingExpense}
          onSave={handleEditExpense}
          open={!!editingExpense}
          onOpenChange={(open) => { if (!open) setEditingExpense(null) }}
        />
      )}
    </div>
  )
}
