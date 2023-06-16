import { CategoryValues } from "../category";

export interface NewTransactionParams {
  description: string;
  amount: number;
  type: number;
  categoryId: number;
}

export interface TransactionValues {
  id: string;
  description: string;
  amount: number;
  type: number;
  category: CategoryValues;
  createdAt: Date;
}

export interface SearchTransactionsParams {
  searchInput: string;
}
