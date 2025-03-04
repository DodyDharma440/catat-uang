export interface ICategory {
  id: string;
  name: string;
  userId: string;
}

export type TransactionType = "income" | "expense";

export interface ITransaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  note: string;
  type: TransactionType;
}

export type ITransactionForm = Omit<ITransaction, "id">;
