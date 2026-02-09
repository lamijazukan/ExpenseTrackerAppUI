'use client';

import React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table"
import { mockTransactions, type Transaction } from "@/app/lib/mock-data"

function EditTransactionDialog({
  transaction,
  onSave,
  open,
  onOpenChange,
}: {
  transaction: Transaction
  onSave: (updated: Transaction) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [store, setStore] = useState(transaction.store)
  const [date, setDate] = useState(transaction.date)
  const [category, setCategory] = useState(transaction.category)
  const [paymentMethod, setPaymentMethod] = useState(transaction.paymentMethod)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!store || !date || !category) return
    onSave({
      ...transaction,
      store,
      date,
      category,
      paymentMethod,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card text-card-foreground sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Edit Transaction</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the transaction details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-1.5">
            <Label className="text-card-foreground text-sm">Store</Label>
            <Input
              value={store}
              onChange={(e) => setStore(e.target.value)}
              required
              className="border-border bg-secondary text-card-foreground"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-card-foreground text-sm">Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
          <div className="flex flex-col gap-1.5">
            <Label className="text-card-foreground text-sm">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as Transaction["paymentMethod"])}>
              <SelectTrigger className="border-border bg-secondary text-card-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-card-foreground">
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Debit Card">Debit Card</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
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
              disabled={!store || !date || !category}
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

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const recent = transactions.slice(0, 5)
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [editingTx, setEditingTx] = useState<Transaction | null>(null)

  function handleEditTransaction(updated: Transaction) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    )
    setEditingTx(null)
  }

  function handleDeleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Recent Transactions
          </CardTitle>
          <Link
            to="/expenses"
            className="text-sm font-medium text-olive hover:underline"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Store</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="w-12 text-muted-foreground">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="border-border hover:bg-muted/50"
                >
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="font-medium text-card-foreground">
                    {tx.store}
                  </TableCell>
                  <TableCell className="font-semibold text-destructive">
                    -${tx.amount.toFixed(2)}
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
                          onClick={() => setSelectedTx(tx)}
                        >
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer focus:bg-muted focus:text-card-foreground"
                          onClick={() => setEditingTx(tx)}
                        >
                          <Edit2 className="mr-2 h-3.5 w-3.5" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border" />
                        <DropdownMenuItem
                          className="cursor-pointer text-destructive focus:bg-muted focus:text-destructive"
                          onClick={() => handleDeleteTransaction(tx.id)}
                        >
                          <Trash2 className="mr-2 h-3.5 w-3.5" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transaction Detail Dialog */}
      <Dialog
        open={!!selectedTx}
        onOpenChange={(v) => { if (!v) setSelectedTx(null) }}
      >
        <DialogContent className="border-border bg-card text-card-foreground sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">Transaction Details</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Details and expense items for this transaction.
            </DialogDescription>
          </DialogHeader>

          {selectedTx && (
            <div className="flex flex-col gap-4 pt-2">
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Store</span>
                    <span className="font-medium text-card-foreground">{selectedTx.store}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-card-foreground">
                      {new Date(selectedTx.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-bold text-card-foreground">
                      ${selectedTx.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="text-card-foreground">{selectedTx.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="inline-flex items-center rounded-full bg-olive/10 px-2.5 py-0.5 text-xs font-medium text-olive">
                      {selectedTx.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-card-foreground">
                  Expense Items ({selectedTx.items.length})
                </h4>
                <div className="flex flex-col gap-0">
                  {selectedTx.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b border-border py-2.5 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-olive/50" />
                        <div>
                          <p className="text-sm font-medium text-card-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-card-foreground">
                        ${item.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Transaction Dialog */}
      {editingTx && (
        <EditTransactionDialog
          transaction={editingTx}
          onSave={handleEditTransaction}
          open={!!editingTx}
          onOpenChange={(open) => { if (!open) setEditingTx(null) }}
        />
      )}
    </>
  )
}
