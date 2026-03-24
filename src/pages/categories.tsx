"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { CategoryTree } from "../types/category-types";
import { CategoryFormDialog } from "@/src/components/categories/category-form-dialog";
import { CategoryCard } from "@/src/components/categories/category-card";
import { getCategoryTree } from "../api/categories-service";
import { BudgetResponse } from "../types/budget-types";
import { getBudgets } from "../api/budget-service";

export default function CategoriesPage() {
   const [categories, setCategories] = useState<CategoryTree[]>([]);
  const [budgets, setBudgets] = useState<BudgetResponse[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const [categoryTree, budgetsData] = await Promise.all([
        getCategoryTree(),
        getBudgets(),
      ]);


      setCategories(categoryTree);
      setBudgets(budgetsData.budgets);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div>Loading categories...</div>;

  const budgetMap = new Map(
    budgets.map((b) => [b.categoryId, b])
  );

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
          onSuccess={loadData}
          trigger={
            <Button className="bg-olive text-olive-foreground hover:bg-olive/90 font-semibold">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          }
        />
      </div>

      <div className="grid items-start gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <CategoryCard
            key={category.categoryId}
            category={category}
            budgetMap={budgetMap}
            onRefresh={loadData}
          />
        ))}
      </div>
    </div>
  );
}