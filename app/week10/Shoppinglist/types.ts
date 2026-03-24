export interface Item {
  id?: string;
  name: string;
  quantity: number;
  category: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface ItemInput {
  name: string;
  quantity: number;
  category: string;
}