export interface Item {
  id?: string; // Optional because new items might not have an ID yet
  name: string;
  quantity: number;
  category: string;
}