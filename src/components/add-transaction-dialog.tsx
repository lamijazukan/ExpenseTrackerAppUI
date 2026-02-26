import { useState } from "react";
import { Plus, Trash2, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { mockCategories } from "@/src/lib/mock-data";

interface ExpenseItem {
  category: string;
  amount: string;
  productName: string;
}

const defaultItem: ExpenseItem = { category: "", amount: "", productName: "" };

export function AddTransactionDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [paidDate, setPaidDate] = useState("");
  const [store, setStore] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [items, setItems] = useState<ExpenseItem[]>([{ ...defaultItem }]);

  function resetForm() {
    setStep(1);
    setPaidDate("");
    setStore("");
    setTotalAmount("");
    setPaymentMethod("");
    setItems([{ ...defaultItem }]);
  }

  function addItem() {
    setItems([...items, { ...defaultItem }]);
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof ExpenseItem, value: string) {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  }

  const step1Valid = paidDate && store && totalAmount && paymentMethod;
  const step2Valid =
    items.length > 0 &&
    items.every((i) => i.category && i.amount && i.productName);

  function handleConfirm() {
    setOpen(false);
    resetForm();
  }

  const stepLabels = ["Details", "Items", "Review"];

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-olive text-olive-foreground hover:bg-olive/90 font-semibold">
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card text-card-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">
            Add Transaction
          </DialogTitle>
          <DialogDescription className="sr-only">
            Fill out the form to add a new transaction in three steps: details,
            items, and review.
          </DialogDescription>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-2 pb-2">
          {stepLabels.map((label, i) => {
            const stepNum = i + 1;
            const isActive = step === stepNum;
            const isDone = step > stepNum;
            return (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className={`h-px w-6 ${isDone ? "bg-olive" : "bg-border"}`}
                  />
                )}
                <div className="flex items-center gap-1.5">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      isActive
                        ? "bg-olive text-olive-foreground"
                        : isDone
                          ? "bg-olive/20 text-olive"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" /> : stepNum}
                  </div>
                  <span
                    className={`text-xs ${isActive ? "text-card-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="paidDate"
                className="text-card-foreground text-sm"
              >
                Paid Date
              </Label>
              <Input
                id="paidDate"
                type="date"
                value={paidDate}
                onChange={(e) => setPaidDate(e.target.value)}
                className="border-border bg-muted text-card-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="store" className="text-card-foreground text-sm">
                Store
              </Label>
              <Input
                id="store"
                placeholder="e.g. Bingo Supermarket"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                className="border-border bg-muted text-card-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="totalAmount"
                className="text-card-foreground text-sm"
              >
                Total Amount
              </Label>
              <Input
                id="totalAmount"
                type="number"
                placeholder="0.00"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="border-border bg-muted text-card-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-card-foreground text-sm">
                Payment Method
              </Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="border-border bg-muted text-card-foreground">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-card-foreground">
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end pt-2">
              <Button
                onClick={() => setStep(2)}
                disabled={!step1Valid}
                className="bg-olive text-olive-foreground hover:bg-olive/90 disabled:opacity-40"
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-4 pt-2">
            <p className="text-sm text-muted-foreground">
              Add individual items for this transaction.
            </p>
            <div className="flex max-h-64 flex-col gap-3 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 rounded-lg border border-border bg-muted/50 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Item {idx + 1}
                    </span>
                    {items.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(idx)}
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder="Product name"
                    value={item.productName}
                    onChange={(e) =>
                      updateItem(idx, "productName", e.target.value)
                    }
                    className="border-border bg-muted text-card-foreground placeholder:text-muted-foreground"
                  />
                  <div className="flex gap-2">
                    <Select
                      value={item.category}
                      onValueChange={(v) => updateItem(idx, "category", v)}
                    >
                      <SelectTrigger className="flex-1 border-border bg-muted text-card-foreground">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="border-border bg-card text-card-foreground">
                        {mockCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={item.amount}
                      onChange={(e) =>
                        updateItem(idx, "amount", e.target.value)
                      }
                      className="w-28 border-border bg-muted text-card-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={addItem}
              className="w-full border-dashed border-border text-muted-foreground hover:bg-muted hover:text-foreground bg-transparent"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add item
            </Button>
            <div className="flex justify-between pt-2">
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!step2Valid}
                className="bg-olive text-olive-foreground hover:bg-olive/90 disabled:opacity-40"
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="flex flex-col gap-4 pt-2">
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="mb-3 text-sm font-semibold text-card-foreground">
                Transaction Summary
              </h4>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-card-foreground">
                    {paidDate
                      ? new Date(paidDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Store</span>
                  <span className="text-card-foreground">{store}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold text-card-foreground">
                    ${Number(totalAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="text-card-foreground">{paymentMethod}</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="mb-3 text-sm font-semibold text-card-foreground">
                Items ({items.length})
              </h4>
              <div className="flex flex-col gap-1.5">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.productName}{" "}
                      <span className="text-xs">({item.category})</span>
                    </span>
                    <span className="text-card-foreground">
                      ${Number(item.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <Button
                variant="ghost"
                onClick={() => setStep(2)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-olive text-olive-foreground hover:bg-olive/90 font-semibold"
              >
                <Check className="mr-2 h-4 w-4" />
                Confirm & Save
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
