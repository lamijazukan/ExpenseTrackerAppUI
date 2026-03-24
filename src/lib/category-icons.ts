import {
  ShoppingCart,
  Car,
  Film,
  Heart,
  ShoppingBag,
  Utensils,
  Laptop,
  Zap,
  DollarSign,
} from "lucide-react";

export const iconMap = {
  ShoppingCart,
  Car,
  Film,
  Heart,
  ShoppingBag,
  Utensils,
  Laptop,
  Zap,
  DollarSign,
};

export type IconName = keyof typeof iconMap;

export const iconOptions: IconName[] = [
  "ShoppingCart",
  "Car",
  "Film",
  "Heart",
  "ShoppingBag",
  "Utensils",
  "Laptop",
  "Zap",
];