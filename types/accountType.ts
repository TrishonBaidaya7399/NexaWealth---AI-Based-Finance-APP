import { Decimal } from "@prisma/client/runtime/library";
import { TTransaction } from "./transactionType";

// types/account.ts
export enum EAccountType {
  CURRENT = "CURRENT",
  SAVINGS = "SAVINGS",
}
export enum ECurrency {
  USD = "USD",
  BDT = "BDT",
  INR = "INR",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  CAD = "CAD",
  AUD = "AUD",
  SGD = "SGD",
  CHF = "CHF",
  CNY = "CNY",
}

export type TAccount = {
  id: string;
  name: string;
  type: EAccountType;
  balance: number | Decimal;
  isDefault: boolean;
  userId: string;
  transactions?: TTransaction[];
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  currency?: ECurrency;
};

export type TAccountCreate = Omit<
  TAccount,
  "id" | "createdAt" | "updatedAt" | "transactions"
>;
export type TAccountUpdate = Partial<TAccountCreate>;
