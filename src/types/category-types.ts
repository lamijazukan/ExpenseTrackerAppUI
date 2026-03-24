export interface Category {
    categoryId: number; // Matches backend CategoryId
    name: string;
    parentCategoryId?: number; // Nullable for parents
    budget?: number; // Frontend-specific (add via API if needed)
    spent?: number; // Frontend-specific
    icon?: string; // Frontend-specific for parents
    childrenCategories?: Category[]; 
}

export interface CategoryFormData {
    name: string;
    parentCategoryId?: number;
}

export interface CategoryResponse {
    categoryId: number;
    name: string;
    parentCategoryId?: number;
}

export interface CategoryTree{
    categoryId: number;
    name: string;
    parentCategoryId?: number;
   children: CategoryTree[];
}
