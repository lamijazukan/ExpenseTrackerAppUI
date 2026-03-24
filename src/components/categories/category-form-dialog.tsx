"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { createCategory, updateCategory } from "@/src/api/categories-service";
import { CategoryTree } from "@/src/types/category-types";
import { iconOptions, iconMap, IconName } from "@/src/lib/category-icons";
import { getCategoryIcons, saveCategoryIcon } from "@/src/lib/category-icon-storage";
import { createBudget, getBudgetById, updateBudget } from "@/src/api/budget-service";


export function CategoryFormDialog({
  mode,
  category,
  parentCategoryId,
  budgetId,
  trigger,
  onSuccess,
}: {
  mode: "add" | "edit";
  category?: CategoryTree;
  parentCategoryId?: number;
  budgetId?: number;
  trigger: React.ReactNode;
  onSuccess: () => void;
}) {
 const [open, setOpen] = useState(false);

  const [name, setName] = useState(category?.name ?? "");
  const [icon, setIcon] = useState<IconName>("ShoppingCart");
  const [budget, setBudget] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


 useEffect(() => {
  if (!open) return;

  if (mode === "add") {
    setName("");
    setIcon("ShoppingCart");
    setBudget(0);
    setStartDate("");
    setEndDate("");
    return;
  }

  async function loadBudget() {
    if (mode === "edit" && category) {
      try {
        setName(category.name);
        const savedIcon = getCategoryIcons()[category.categoryId];
        if (savedIcon && savedIcon in iconMap) {
          setIcon(savedIcon as IconName);
        }

        if (!budgetId) return;

        const data = await getBudgetById(budgetId);
        setBudget(data.amount);
        setStartDate(data.startDate.split("T")[0]);
        setEndDate(data.endDate.split("T")[0]);
      } catch (err) {
        console.error("Failed to load budget", err);
      }
    }
  }

  loadBudget();
}, [open, mode, category, budgetId]);

  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (mode === "add") {
      const created = await createCategory({
        name,
        parentCategoryId,
      });

      await createBudget({
        categoryId: created.categoryId,
        amount: budget,
        startDate,
        endDate
      });

      saveCategoryIcon(created.categoryId, icon);
    }
    

    if (mode === "edit" && category) {
      await updateCategory(category.categoryId, {
        name,
        parentCategoryId: category.parentCategoryId,
      });

      if (budgetId) {
        await updateBudget(budgetId, {
          categoryId: category.categoryId,
          amount: budget,
          startDate,
          endDate
        });
      }

  saveCategoryIcon(category.categoryId, icon);
    }

    setOpen(false);
    onSuccess();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border-border bg-card text-card-foreground sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">
            {mode === "add" ? "Create Category" : "Edit Category"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {mode === "add"
              ? "Create a new budget category to organize your expenses."
              : "Update the category details."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="catName" className="text-card-foreground text-sm">
              Category Name
            </Label>
            <Input
              id="catName"
              placeholder="e.g. Education"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-border bg-secondary text-card-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-card-foreground text-sm">Icon</Label>
            <Select value={icon} onValueChange={(value) => setIcon(value as IconName)} required>
              <SelectTrigger className="border-border bg-secondary text-card-foreground">
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-card-foreground">
                {iconOptions.map((ic) => {
                  const Icon = iconMap[ic];
                  return (
                    <SelectItem key={ic} value={ic}>
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {ic}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="catBudget" className="text-card-foreground text-sm">
              Monthly Budget ($)
            </Label>
            <Input
              id="catBudget"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={budget}
              onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
              required
              className="border-border bg-secondary text-card-foreground placeholder:text-muted-foreground"
            />
          </div>
           <div className="flex flex-col gap-1.5">
            <Label htmlFor="sDate" className="text-card-foreground text-sm">
              Start Date
            </Label>
            <Input
              id="sDate"
              type="date"
              placeholder="Select start date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="border-border bg-secondary text-card-foreground placeholder:text-muted-foreground"
            />
          </div>
           <div className="flex flex-col gap-1.5">
            <Label htmlFor="eDate" className="text-card-foreground text-sm">
              End Date
            </Label>
            <Input
              id="eDate"
              type="date"
              placeholder="Select end date"
              min={startDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="border-border bg-secondary text-card-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={!name || !icon || !budget}
              className="bg-olive text-olive-foreground hover:bg-olive/90 font-semibold disabled:opacity-40"
            >
              {mode === "add" ? "Create Category" : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}