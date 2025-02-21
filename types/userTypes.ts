import { TAccount } from "./accountType";
import { TBudget } from "./budgetType";
import { TTransaction } from "./transactionType";

// types/user.ts
export type TUser = {
  id: string;
  clerkUserId: string;
  email: string;
  name?: string | null;
  imageUrl?: string | null;
  transactions: TTransaction;
  accounts: TAccount;
  budgets: TBudget;
  createdAt: Date;
  updatedAt: Date;
  isDefault?: boolean;
  balance?: number;
};

export type TUserCreate = Omit<
  TUser,
  "id" | "createdAt" | "updatedAt" | "transactions" | "accounts" | "budgets"
>;
export type TUserUpdate = Partial<TUserCreate>;
