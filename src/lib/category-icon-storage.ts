const STORAGE_KEY = "category_icons";

export function getCategoryIcons(): Record<number, string> {
  if (typeof window === "undefined") return {};

  const stored = localStorage.getItem(STORAGE_KEY);

  return stored ? JSON.parse(stored) : {};
}

export function saveCategoryIcon(categoryId: number, icon: string) {
  const icons = getCategoryIcons();

  icons[categoryId] = icon;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(icons));
}