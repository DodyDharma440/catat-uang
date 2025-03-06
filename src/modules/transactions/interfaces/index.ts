export interface ICategory {
  id: string;
  name: string;
  userId: string;
  iconName: string;
  color: string;
}

export type TransactionType = "income" | "expense";

export interface ITransaction {
  id: string;
  title: string;
  amount: number;
  category: ICategory;
  date: string;
  time: string;
  note: string;
  type: TransactionType;
}

export interface ITransactionForm
  extends Omit<ITransaction, "id" | "category"> {
  category: string;
}
