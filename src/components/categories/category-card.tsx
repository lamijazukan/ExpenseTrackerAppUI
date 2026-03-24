"use client";

import React, { useEffect, useState } from "react";
import {
  Car,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Edit2,
  MoreHorizontal,
  Plus,
  Trash2,
  ShoppingCart,
  Film,
  Heart,
  ShoppingBag,
  Utensils,
  Laptop,
  Zap,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { CategoryFormDialog } from "./category-form-dialog";
import { CategoryTree } from "@/src/types/category-types";
import { Budget, BudgetResponse } from "@/src/types/budget-types";
import { deleteCategory } from "@/src/api/categories-service";
import { BudgetCurrentStatus } from "@/src/types/statistics-types";
import { getBudgetCurrentStatus } from "@/src/api/statistics-service";
import { getCategoryIcons } from "@/src/lib/category-icon-storage";
import { iconOptions, iconMap, IconName } from "@/src/lib/category-icons";


export function CategoryCard({
  category,
  budgetMap,
  onRefresh,
  isSubcategory = false,
}: {
  category: CategoryTree;
  budgetMap: Map<number, BudgetResponse>;
  onRefresh: () => void;
  isSubcategory?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<BudgetCurrentStatus | null>(null);
 

  const icons = getCategoryIcons();

const iconName = icons[category.categoryId] as IconName | undefined;

const Icon = iconName ? iconMap[iconName] : iconMap.DollarSign;

   useEffect(() => {
  async function loadStatus() {
    if (!budgetMap) return;

    const data = await getBudgetCurrentStatus(budgetMap.get(category.categoryId)?.budgetId ?? 0);
    setStatus(data);
  }

  loadStatus();
}, [budgetMap]);

  const amount = budgetMap.get(category.categoryId)?.amount ?? 0;
  const spent = status?.spentAmount ?? 0;
  const remaining = status?.remainingAmount ?? amount;

  const percentage =
    amount === 0 ? 0 : Math.min(100, Math.round((spent / amount) * 100));


  async function handleDelete() {
    await deleteCategory(category.categoryId);
    onRefresh();
  }

  return (
    <Card
      className={`border-border bg-card self-start overflow-hidden transition-shadow hover:shadow-lg hover:shadow-foreground/5 ${
        isSubcategory ? "rounded-none border-x-0 border-b-0 shadow-none" : ""
      }`}
    >
      <CardContent className="p-0">
        <div className="flex items-center gap-0">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex flex-1 items-center gap-4 p-5 text-left transition-colors"
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
                    ${spent.toFixed(2)}{" "}
                    <span className="text-muted-foreground">
                      / ${amount}
                    </span>
                  </span>
                  {expanded ? (
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
                  category={category}
                  budgetId={budgetMap.get(category.categoryId)?.budgetId}
                  onSuccess={onRefresh}
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  }
                />
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
                  <DropdownMenuSeparator />

              <CategoryFormDialog
                mode="add"
                parentCategoryId={category.categoryId}
                onSuccess={onRefresh}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Subcategory
                  </DropdownMenuItem>
                }
              />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
 {expanded && category.children.length > 0 && (
          <div className="border-t">

            {category.children.map((child) => (
              <CategoryCard
                key={child.categoryId}
                category={child}
                budgetMap={budgetMap}
                onRefresh={onRefresh}
                isSubcategory
              />
            ))}

          </div>
        )}

      </CardContent>
    </Card>
  );
}
