"use client";

import React, { useState, useCallback } from "react";
import {
  ChevronDown,
  ChevronRight,
  DollarSign,
  Edit2,
  MoreHorizontal,
  Plus,
  ShoppingCart,
  Car,
  Film,
  Heart,
  ShoppingBag,
  Utensils,
  Laptop,
  Trash2,
  Zap,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  mockCategories,
  type Category,
  type Subcategory,
} from "@/src/lib/mock-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Car,
  Film,
  Heart,
  ShoppingBag,
  Utensils,
  Laptop,
  Zap,
};

const availableIcons = [
  { value: "ShoppingCart", label: "Shopping Cart" },
  { value: "Car", label: "Car" },
  { value: "Film", label: "Film" },
  { value: "Heart", label: "Heart" },
  { value: "ShoppingBag", label: "Shopping Bag" },
  { value: "Utensils", label: "Utensils" },
  { value: "Laptop", label: "Laptop" },
  { value: "Zap", label: "Zap" },
];

function CategoryFormDialog({
  mode,
  initial,
  onSubmit,
  trigger,
}: {
  mode: "add" | "edit";
  initial?: { name: string; icon: string; budget: number };
  onSubmit: (data: { name: string; icon: string; budget: number }) => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initial?.name ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "");
  const [budget, setBudget] = useState(initial?.budget?.toString() ?? "");

  function reset() {
    setName(initial?.name ?? "");
    setIcon(initial?.icon ?? "");
    setBudget(initial?.budget?.toString() ?? "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !icon || !budget) return;
    onSubmit({ name, icon, budget: Number(budget) });
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border-border bg-card text-card-foreground sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">
            {mode === "add" ? "New Category" : "Edit Category"}
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
            <Select value={icon} onValueChange={setIcon} required>
              <SelectTrigger className="border-border bg-secondary text-card-foreground">
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-card-foreground">
                {availableIcons.map((ic) => {
                  const IconComp = iconMap[ic.value];
                  return (
                    <SelectItem key={ic.value} value={ic.value}>
                      <span className="flex items-center gap-2">
                        {IconComp && <IconComp className="h-4 w-4" />}
                        {ic.label}
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
              onChange={(e) => setBudget(e.target.value)}
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

function EditSubcategoryDialog({
  subcategory,
  onSubmit,
  trigger,
}: {
  subcategory: Subcategory;
  onSubmit: (data: { name: string; budget: number }) => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(subcategory.name);
  const [budget, setBudget] = useState(subcategory.budget.toString());

  function reset() {
    setName(subcategory.name);
    setBudget(subcategory.budget.toString());
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !budget) return;
    onSubmit({ name, budget: Number(budget) });
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border-border bg-card text-card-foreground sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">
            Edit Subcategory
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the subcategory name and budget.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-1.5">
            <Label className="text-card-foreground text-sm">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-border bg-secondary text-card-foreground"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-card-foreground text-sm">Budget ($)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
              className="border-border bg-secondary text-card-foreground"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!name || !budget}
              className="bg-olive text-olive-foreground hover:bg-olive/90 disabled:opacity-40"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddSubcategoryForm({
  onAdd,
  onCancel,
}: {
  onAdd: (sub: Subcategory) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !budget) return;
    onAdd({
      id: `sub-${Date.now()}`,
      name,
      budget: Number(budget),
      spent: 0,
    });
    setName("");
    setBudget("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-t border-border p-4"
    >
      <p className="text-xs font-medium text-muted-foreground">
        New Subcategory
      </p>
      <div className="flex gap-2">
        <Input
          placeholder="Subcategory name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 border-border bg-secondary text-card-foreground text-sm placeholder:text-muted-foreground"
        />
        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
          className="w-28 border-border bg-secondary text-card-foreground text-sm placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-muted-foreground hover:text-card-foreground"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={!name || !budget}
          className="bg-olive text-olive-foreground hover:bg-olive/90 disabled:opacity-40"
        >
          Add
        </Button>
      </div>
    </form>
  );
}

function CategoryCard({
  category,
  isExpanded,
  onToggle,
  onAddSubcategory,
  onEditCategory,
  onDeleteCategory,
  onEditSubcategory,
  onDeleteSubcategory,
}: {
  category: Category;
  isExpanded: boolean;
  onToggle: () => void;
  onAddSubcategory: (catId: string, sub: Subcategory) => void;
  onEditCategory: (
    catId: string,
    data: { name: string; icon: string; budget: number },
  ) => void;
  onDeleteCategory: (catId: string) => void;
  onEditSubcategory: (
    catId: string,
    subId: string,
    data: { name: string; budget: number },
  ) => void;
  onDeleteSubcategory: (catId: string, subId: string) => void;
}) {
  const [showSubForm, setShowSubForm] = useState(false);
  const Icon = iconMap[category.icon] || DollarSign;
  const percentage = Math.min(
    100,
    Math.round((category.spent / category.budget) * 100),
  );
  const remaining = Math.max(0, category.budget - category.spent);

  return (
    <Card className="border-border bg-card self-start overflow-hidden transition-shadow hover:shadow-lg hover:shadow-foreground/5">
      <CardContent className="p-0">
        <div className="flex items-center gap-0">
          <button
            type="button"
            onClick={onToggle}
            className="flex flex-1 items-center gap-4 p-5 text-left transition-colors hover:bg-secondary/60"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-olive/10">
              <Icon className="h-5 w-5 text-olive" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-card-foreground">
                  {category.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-card-foreground">
                    ${category.spent.toFixed(2)}{" "}
                    <span className="text-muted-foreground">
                      / ${category.budget}
                    </span>
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Progress
                  value={percentage}
                  className="h-2 flex-1 bg-secondary [&>div]:bg-olive"
                />
                <span className="text-xs text-muted-foreground">
                  {percentage}%
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                ${remaining.toFixed(2)} remaining
              </p>
            </div>
          </button>

          <div className="pr-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-card-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Category options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-border bg-card text-card-foreground"
              >
                <CategoryFormDialog
                  mode="edit"
                  initial={{
                    name: category.name,
                    icon: category.icon,
                    budget: category.budget,
                  }}
                  onSubmit={(data) => onEditCategory(category.id, data)}
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  }
                />
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={() => onDeleteCategory(category.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-border">
            {category.subcategories.map((sub) => (
              <SubcategoryRow
                key={sub.id}
                subcategory={sub}
                onEdit={(data) => onEditSubcategory(category.id, sub.id, data)}
                onDelete={() => onDeleteSubcategory(category.id, sub.id)}
              />
            ))}

            {showSubForm ? (
              <AddSubcategoryForm
                onAdd={(sub) => {
                  onAddSubcategory(category.id, sub);
                  setShowSubForm(false);
                }}
                onCancel={() => setShowSubForm(false)}
              />
            ) : (
              <div className="border-t border-border p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSubForm(true)}
                  className="w-full text-olive hover:text-olive hover:bg-olive/10"
                >
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Add subcategory
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SubcategoryRow({
  subcategory,
  onEdit,
  onDelete,
}: {
  subcategory: Subcategory;
  onEdit: (data: { name: string; budget: number }) => void;
  onDelete: () => void;
}) {
  const percentage = Math.min(
    100,
    Math.round((subcategory.spent / subcategory.budget) * 100),
  );

  return (
    <div className="group flex items-center gap-4 border-b border-border px-5 py-3 last:border-b-0">
      <div className="h-2 w-2 shrink-0 rounded-full bg-olive/50" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm text-card-foreground">{subcategory.name}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-card-foreground/70">
              ${subcategory.spent.toFixed(2)}{" "}
              <span className="text-muted-foreground">
                / ${subcategory.budget}
              </span>
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-card-foreground"
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                  <span className="sr-only">Subcategory options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-border bg-card text-card-foreground"
              >
                <EditSubcategoryDialog
                  subcategory={subcategory}
                  onSubmit={onEdit}
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  }
                />
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-3">
          <Progress
            value={percentage}
            className="h-1.5 flex-1 bg-secondary [&>div]:bg-olive/70"
          />
          <span className="text-xs text-muted-foreground">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  function handleAddCategory(data: {
    name: string;
    icon: string;
    budget: number;
  }) {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: data.name,
      icon: data.icon,
      budget: data.budget,
      spent: 0,
      subcategories: [],
    };
    setCategories((prev) => [...prev, newCat]);
  }

  function handleEditCategory(
    catId: string,
    data: { name: string; icon: string; budget: number },
  ) {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? { ...c, name: data.name, icon: data.icon, budget: data.budget }
          : c,
      ),
    );
  }

  function handleDeleteCategory(catId: string) {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.delete(catId);
      return next;
    });
  }

  function handleAddSubcategory(catId: string, sub: Subcategory) {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId ? { ...c, subcategories: [...c.subcategories, sub] } : c,
      ),
    );
  }

  function handleEditSubcategory(
    catId: string,
    subId: string,
    data: { name: string; budget: number },
  ) {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? {
              ...c,
              subcategories: c.subcategories.map((s) =>
                s.id === subId
                  ? { ...s, name: data.name, budget: data.budget }
                  : s,
              ),
            }
          : c,
      ),
    );
  }

  function handleDeleteSubcategory(catId: string, subId: string) {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? {
              ...c,
              subcategories: c.subcategories.filter((s) => s.id !== subId),
            }
          : c,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage your budget categories and track spending limits.
          </p>
        </div>
        <CategoryFormDialog
          mode="add"
          onSubmit={handleAddCategory}
          trigger={
            <Button className="bg-olive text-olive-foreground hover:bg-olive/90 font-semibold">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          }
        />
      </div>

      <div className="grid items-start gap-4 md:grid-cols-2">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            isExpanded={expandedIds.has(cat.id)}
            onToggle={() => toggleExpanded(cat.id)}
            onAddSubcategory={handleAddSubcategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
            onEditSubcategory={handleEditSubcategory}
            onDeleteSubcategory={handleDeleteSubcategory}
          />
        ))}
      </div>
    </div>
  );
}
