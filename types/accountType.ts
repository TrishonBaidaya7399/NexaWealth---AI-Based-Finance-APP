import { TTransaction } from "./transactionType";

// types/account.ts
export enum EAccountType {
    CURRENT = "CURRENT",
    SAVINGS = "SAVINGS",
  }
  
  export type TAccount = {
    id: string;
    name: string;
    type: EAccountType;
    balance: number; 
    isDefault: boolean;
    userId: string;
    transactions: TTransaction[];
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type TAccountCreate = Omit<TAccount, 'id' | 'createdAt' | 'updatedAt' | 'transactions'>;
  export type TAccountUpdate = Partial<TAccountCreate>;