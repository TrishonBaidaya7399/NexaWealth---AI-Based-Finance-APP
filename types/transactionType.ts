// types/transaction.ts
export enum ETransactionType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
  }
  
  export enum ERecurringInterval {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
  }
  
  export enum ETransactionStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
  }
  
  export type TTransaction = {
    id: string;
    type: ETransactionType;
    amount: number; 
    description?: string | null;
    date: Date;
    category: string;
    receiptURL?: string | null;
    isRecurring: boolean;
    recurringInterval?: ERecurringInterval | null;
    nextRecurringDate: Date;
    lastProcessed?: Date | null;
    status: ETransactionStatus;
    userID: string;
    accountId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type TTransactionCreate = Omit<TTransaction, 'id' | 'createdAt' | 'updatedAt'>;
  export type TTransactionUpdate = Partial<TTransactionCreate>;